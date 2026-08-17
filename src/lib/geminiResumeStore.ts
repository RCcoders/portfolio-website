import { GoogleAIFileManager, FileState } from '@google/generative-ai/server';
import path from 'path';
import fs from 'fs';

export interface ResumeFileContext {
  fileData: {
    fileUri: string;
    mimeType: string;
  };
}

let inMemoryCachedUri: string | null = process.env.GEMINI_RESUME_FILE_URI || null;

/**
 * Uploads/indexes the resume file into Gemini File API.
 */
export async function uploadAndIndexResume(
  customPath?: string
): Promise<{ uri: string; name: string; mimeType: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }

  const fileManager = new GoogleAIFileManager(apiKey);
  const docxPath = path.join(process.cwd(), 'knowledge', 'Raghav_Chawla_Resume_ATS.docx');
  const pdfPath = path.join(process.cwd(), 'public', 'pdfs', 'resume.pdf');

  let targetPath = customPath;
  let mimeType = 'application/pdf';

  if (!targetPath) {
    if (fs.existsSync(docxPath)) {
      targetPath = docxPath;
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (fs.existsSync(pdfPath)) {
      targetPath = pdfPath;
      mimeType = 'application/pdf';
    }
  } else {
    mimeType = targetPath.endsWith('.docx')
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : 'application/pdf';
  }

  if (!targetPath || !fs.existsSync(targetPath)) {
    throw new Error(`Resume file not found at: ${targetPath}`);
  }

  console.log(`[GeminiResumeStore] Uploading resume to Gemini File API from: ${targetPath}`);

  const uploadResult = await fileManager.uploadFile(targetPath, {
    mimeType,
    displayName: 'Raghav_Chawla_Resume_ATS',
  });

  const file = uploadResult.file;
  console.log(`[GeminiResumeStore] Uploaded file: ${file.name} (URI: ${file.uri})`);

  // Wait for processing to complete if pending
  let fileState = file.state;
  let attempts = 0;
  while (fileState === FileState.PROCESSING && attempts < 10) {
    console.log('[GeminiResumeStore] Waiting for file processing...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const check = await fileManager.getFile(file.name);
    fileState = check.state;
    attempts++;
  }

  if (fileState === FileState.FAILED) {
    throw new Error('Gemini File API failed to process the resume PDF.');
  }

  inMemoryCachedUri = file.uri;
  return {
    uri: file.uri,
    name: file.name,
    mimeType: file.mimeType,
  };
}

/**
 * Retrieves the cached Resume File Context for Gemini generative requests.
 * Reuses existing File URI from process.env or in-memory cache if available.
 */
export async function getResumeFileContext(): Promise<ResumeFileContext | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null;
  }

  // 1. Check in-memory cache or environment variable
  const activeUri = inMemoryCachedUri || process.env.GEMINI_RESUME_FILE_URI;

  if (activeUri && activeUri.trim().length > 0) {
    const docxExists = fs.existsSync(path.join(process.cwd(), 'knowledge', 'Raghav_Chawla_Resume_ATS.docx'));
    const mimeType = docxExists
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : 'application/pdf';

    return {
      fileData: {
        fileUri: activeUri.trim(),
        mimeType,
      },
    };
  }

  // 2. If not cached, auto-upload and index once
  try {
    const result = await uploadAndIndexResume();
    return {
      fileData: {
        fileUri: result.uri,
        mimeType: result.mimeType,
      },
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn('[GeminiResumeStore] Failed to auto-index resume file:', errorMsg);
    return null;
  }
}
