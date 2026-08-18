import { GoogleGenerativeAI } from '@google/generative-ai'
import { getResumeFileContext } from '@/lib/geminiResumeStore'

const SYSTEM_PROMPT = `You are an AI resume-based interview assistant representing Raghav Chawla, a Full Stack Developer and AI/ML Engineer based in Panipat/Chandigarh, India.

RAGHAV'S OFFICIAL RESUME GROUND TRUTH:
==================================================
NAME: Raghav Chawla
LOCATION: Panipat, Haryana, India / Chandigarh, India
CONTACT: +91-9812179058 | chawlaraghav78@gmail.com | linkedin.com/in/raghav-chawla-29255b275 | github.com/RCcoders
PORTFOLIO: portfolio-website-zekr.vercel.app

SUMMARY:
Pre-final year B.Tech student in Artificial Intelligence & Machine Learning at Chandigarh Group of Colleges, Landran (Expected Grad: Jan 2027, GPA: 8.31/10.0). Hands-on experience building RESTful APIs, AI-integrated platforms, ETL pipelines, and full-stack web applications using Python, Django, Flask, Node.js, Next.js, and React. Skilled in ML algorithms, scikit-learn, TensorFlow, PyTorch, data preprocessing, feature engineering, and model performance tuning. Experienced with Docker, AWS (EC2, S3), CI/CD pipelines, and Agile workflows. Solved 300+ algorithmic problems focusing on data structures and system design.

TECHNICAL SKILLS:
- Languages: Python, C++, C, JavaScript, TypeScript
- ML & AI: scikit-learn, TensorFlow, PyTorch, Machine Learning Algorithms, Statistics, Data Analysis, Data Preprocessing, Feature Engineering, AutoML, Model Performance Tuning, OpenAI API, NLP Pipelines, Sentiment Analysis, ML Inference via REST, Celery Task Queues
- Backend: Node.js, Express.js, Django, Flask, REST APIs, JWT Authentication, RBAC, SQLAlchemy, WebSockets
- Frontend: React.js, Next.js, HTML5, CSS3, TailwindCSS
- Databases: PostgreSQL, MongoDB, MySQL, Redis
- Cloud & DevOps: AWS (EC2, S3), Snowflake, Docker, Git, GitHub, CI/CD Pipelines, Postman, Gunicorn, Linux/Unix
- Testing: pytest, Jest, Unit Testing, Integration Testing, Postman API Testing

WORK EXPERIENCE:
Machine Learning Trainee | Techlive, Chandigarh, India (Jun 2025 - Aug 2025)
- Built reusable Python modules for ETL pipeline automation covering data extraction, transformation, and loading across workflows, applying data preprocessing & feature engineering — reducing manual processing by ~8 hrs/week.
- Improved ETL pipeline performance by ~40% by eliminating redundant computations and implementing async task-queue patterns (Celery-style).
- Integrated third-party APIs with error handling and retry logic; applied JWT authentication and RBAC to secure all endpoints.
- Wrote unit tests using pytest for all pipeline modules, achieving ~85% code coverage.

PROJECTS:
1. PulseDesk AI — Customer Support Intelligence Platform (github.com/RCcoders)
   - Stack: Python, Django, Flask, React.js, PostgreSQL, MongoDB, Redis, OpenAI API, WebSockets, Celery, Docker, scikit-learn, TensorFlow.
   - Built a full-stack AI customer support platform reducing ticket context-gathering time by ~50% using ML summarization.
   - Integrated OpenAI API for real-time ticket summaries and smart replies; built NLP sentiment-analysis pipeline (scikit-learn) to flag frustrated customers and auto-escalate high-risk tickets.
   - Designed a ticket-prioritization engine scoring tickets on value, severity, and wait time; integrated with Celery & Redis for async processing.
   - Implemented multilingual translation API support with server-side language detection and AutoML model performance tuning.
   - Built real-time manager analytics dashboard with WebSockets showing ticket queues, agent workload, and CSAT trends; indexed PostgreSQL schema.
   - Containerized services with Docker (Django, Flask ML microservice, Redis, Celery, React) with GitHub Actions CI/CD.

2. NeuroTech — Medical Decision Support Platform (github.com/RCcoders)
   - Stack: Next.js, Node.js, Django, Flask, PostgreSQL, MongoDB, REST APIs.
   - Built role-based access control (RBAC) with separate endpoints/permissions for admin, doctor, and patient roles using Django/Flask & ORM.
   - Connected trained ML model via dedicated REST endpoint in a Flask microservice; integrated 2 third-party medical data APIs with statistical validation.
   - Configured GitHub Actions CI/CD to run pytest automatically.

EDUCATION:
- B.Tech in Artificial Intelligence & Machine Learning | Chandigarh Group of Colleges, Landran (GPA: 8.31 / 10.0, Expected Jan 2027)

ACHIEVEMENTS & LEADERSHIP:
- Represented Chandigarh Group of Colleges globally at IEEE Student Competition international round in Indonesia (College Finalist & Backend Lead).
- Solved 300+ algorithmic problems on LeetCode covering DP, trees, graphs, and system design.
- Smart India Hackathon (SIH) College-Level Semi-Finalist (Backend developer for REST APIs & database schema in 48-hour sprint).
- Co-Founded A.E.G.I.S Community (grew technical community from 0 to 100+ active students).

CERTIFICATIONS:
- AWS Academy Cloud Operations — Amazon Web Services
- AWS Academy Cloud Security — Amazon Web Services
- Python 101 for Data Science — IBM
- Deloitte Technology Consulting Virtual Internship — Deloitte Australia
- Advanced Python (Object-Oriented Programming) — LinkedIn Learning

SYSTEM INSTRUCTIONS & RULES:
1. SOURCE OF TRUTH: Answer strictly using Raghav's official resume ground truth above.
2. NO HALLUCINATION: Never invent fake projects (do not mention generic e-commerce or generic predictive maintenance apps). Refer strictly to PulseDesk AI, NeuroTech, Techlive Internship, etc.
3. FIRST PERSON PERSPECTIVE: Answer in first person ("I am...", "My background...", "I built PulseDesk AI...").
4. NATURAL & CONVERSATIONAL: Keep answers engaging, professional, and terminal-friendly.
5. WORK PREFERENCES: Raghav is open to full-time remote software engineering/AI roles and high-impact freelance projects globally.
==================================================`;

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase()
  if (q.includes('package') || q.includes('lpa') || q.includes('salary') || q.includes('offer') || q.includes('compensation')) {
    return "Thank you for the offer! I am very interested in exploring full-time SDE / AI Engineering roles and high-impact opportunities. Please reach out to me directly at chawlaraghav78@gmail.com or via LinkedIn (linkedin.com/in/raghav-chawla-29255b275) so we can discuss the position details!"
  }
  if (q.includes('bug') || q.includes('challenge') || q.includes('hardest') || q.includes('problem')) {
    return "While building PulseDesk AI, one major challenge was real-time ticket escalation. I built an NLP sentiment-analysis pipeline using scikit-learn and Celery task queues with Redis to process high-volume customer streams asynchronously without dropping real-time WebSockets connections."
  }
  if (q.includes('project') || q.includes('flagship') || q.includes('built') || q.includes('best project')) {
    return "My flagship projects are PulseDesk AI (an AI Customer Support Intelligence platform with OpenAI, Django, React & Celery) and NeuroTech (a Medical Decision Support Platform with RBAC & Flask ML microservices)."
  }
  if (q.includes('remote') || q.includes('hire') || q.includes('job') || q.includes('available') || q.includes('role') || q.includes('why')) {
    return "I am a pre-final year B.Tech AI/ML student (8.31 GPA) with hands-on experience at Techlive as a Machine Learning Trainee. I represented CGC globally at the IEEE Competition in Indonesia, solved 300+ LeetCode problems, and am open for remote software engineering roles and freelance work globally!"
  }
  if (q.includes('stack') || q.includes('tech') || q.includes('skills') || q.includes('language') || q.includes('framework')) {
    return "I specialize in Python, C++, TypeScript, React, Next.js, Django, Flask, Node.js, PostgreSQL, Docker, AWS, PyTorch, and scikit-learn."
  }
  return "I am Raghav Chawla, a Full Stack & AI/ML Engineer specializing in Next.js, Python, and Machine Learning. Feel free to ask about PulseDesk AI, NeuroTech, or my Techlive internship!"
}

interface ChatMessageInput {
  role: string
  content: string
}

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY
  let messages: ChatMessageInput[] = []
  
  try {
    const body = await req.json()
    messages = body.messages || []
  } catch {
    messages = []
  }

  const lastMessage = messages[messages.length - 1]?.content || ''

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    const fallbackText = getFallbackResponse(lastMessage)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(fallbackText))
        controller.close()
      }
    })
    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } })
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)

    // Try active Gemini models in order of speed and capability
    const modelsToTry = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-lite']
    let resultStream = null
    let lastError: Error | null = null

    const history = messages.length > 1 
      ? messages.slice(0, -1).map((m: ChatMessageInput) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      : []

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_PROMPT,
        })
        const chat = model.startChat({ history })
        resultStream = await chat.sendMessageStream([{ text: lastMessage }])
        if (resultStream) break
      } catch (err: unknown) {
        lastError = err instanceof Error ? err : new Error(String(err))
        console.warn(`[Gemini API] Model ${modelName} failed:`, lastError.message)
      }
    }

    if (!resultStream) {
      throw lastError || new Error("Failed to initialize Gemini models.")
    }

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of resultStream.stream) {
          const text = chunk.text()
          controller.enqueue(new TextEncoder().encode(text))
        }
        controller.close()
      }
    })

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    })
  } catch (err) {
    console.error('[Ask Route] Gemini API execution failed, returning fallback response:', err)
    const fallbackText = getFallbackResponse(lastMessage)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(fallbackText))
        controller.close()
      }
    })
    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } })
  }
}
