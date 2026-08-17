# Raghav Chawla — Personal Portfolio Website

A modern, high-performance portfolio website built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS, featuring an AI interactive terminal and FastAPI backend integration.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend API**: FastAPI (Python), PostgreSQL, Supabase
- **AI Integration**: Google Gemini 2.5/3.6 Flash File & Generative AI API
- **Deployment**: Vercel / Cloudflare

---

## 🛠️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RCcoders/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and populate the required keys:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the Next.js Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐍 Running the FastAPI Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Set up Python Virtual Environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Run the FastAPI server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

---

## 🔑 Environment Variables Documentation

| Variable Name | Description |
| --- | --- |
| `ADMIN_PIN` | Secret PIN for granting admin access |
| `BACKEND_URL` | Fast API backend endpoint URL (e.g. `http://localhost:8000`) |
| `NEXT_PUBLIC_API_URL` | Public API base path |
| `GEMINI_API_KEY` | Google Gemini API key for AI terminal grounding |
| `GEMINI_RESUME_FILE_URI` | Cached Gemini File API URI for indexed resume context |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous API key |

---

## 📦 Deployment Notes

- Deploy on **Vercel** with default Next.js build command (`npm run build`).
- Ensure environment variables are configured in the Vercel dashboard.

