import { GoogleAIFileManager, FileState } from '@google/generative-ai/server';
import path from 'path';
import fs from 'fs';

// Read .env.local manually if running standalone CLI
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envConfig = fs.readFileSync(envLocalPath, 'utf-8');
  envConfig.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.error('ERROR: GEMINI_API_KEY is not configured in .env.local');
    process.exit(1);
  }

  const docxPath = path.join(process.cwd(), 'knowledge', 'Raghav_Chawla_Resume_ATS.docx');
  const pdfPath = path.join(process.cwd(), 'public', 'pdfs', 'resume.pdf');

  let resumePath = '';
  let mimeType = 'application/pdf';

  if (fs.existsSync(docxPath)) {
    resumePath = docxPath;
    mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  } else if (fs.existsSync(pdfPath)) {
    resumePath = pdfPath;
    mimeType = 'application/pdf';
  } else {
    console.error('ERROR: No resume file found in knowledge/ or public/pdfs/');
    process.exit(1);
  }

  console.log(`Uploading & indexing resume from: ${resumePath}...`);
  const fileManager = new GoogleAIFileManager(apiKey);

  const uploadResult = await fileManager.uploadFile(resumePath, {
    mimeType,
    displayName: 'Raghav_Chawla_Resume_ATS',
  });

  let file = uploadResult.file;
  console.log(`Upload complete! Name: ${file.name}, URI: ${file.uri}`);

  let attempts = 0;
  while (file.state === FileState.PROCESSING && attempts < 10) {
    console.log('Processing file...');
    await new Promise((res) => setTimeout(res, 1000));
    file = await fileManager.getFile(file.name);
    attempts++;
  }

  if (file.state === FileState.FAILED) {
    console.error('File processing failed in Gemini File API.');
    process.exit(1);
  }

  console.log(`SUCCESS! File is active and ready for RAG queries.`);
  console.log(`URI: ${file.uri}`);

  // Update .env.local with GEMINI_RESUME_FILE_URI
  let envContent = fs.existsSync(envLocalPath) ? fs.readFileSync(envLocalPath, 'utf-8') : '';
  if (envContent.includes('GEMINI_RESUME_FILE_URI=')) {
    envContent = envContent.replace(/GEMINI_RESUME_FILE_URI=.*/g, `GEMINI_RESUME_FILE_URI=${file.uri}`);
  } else {
    envContent += `\n# Gemini Resume RAG File URI\nGEMINI_RESUME_FILE_URI=${file.uri}\n`;
  }

  fs.writeFileSync(envLocalPath, envContent, 'utf-8');
  console.log(`Updated GEMINI_RESUME_FILE_URI in .env.local successfully!`);
}

main().catch((err) => {
  console.error('Indexing failed:', err);
  process.exit(1);
});
