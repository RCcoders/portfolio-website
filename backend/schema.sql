-- Drop existing tables if they exist (optional, use with caution)
-- DROP TABLE IF EXISTS projects;
-- DROP TABLE IF EXISTS certificates;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    github_url TEXT,
    live_url TEXT,
    status TEXT NOT NULL DEFAULT 'completed',
    project_date TEXT,
    duration TEXT,
    client TEXT,
    features TEXT[] NOT NULL DEFAULT '{}',
    technologies JSONB NOT NULL DEFAULT '{}'::jsonb,
    metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
    featured BOOLEAN NOT NULL DEFAULT false
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    certificate_date TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    credential_url TEXT NOT NULL,
    long_description TEXT,
    skills TEXT[] NOT NULL DEFAULT '{}',
    duration TEXT,
    level TEXT,
    modules TEXT[] NOT NULL DEFAULT '{}'
);

-- Add index on certificate slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_certificates_slug ON certificates(slug);

-- Enable Row Level Security (RLS) on both tables (Supabase best practice)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Set up security policies for projects
-- 1. Allow everyone (public/unauthenticated) read access
CREATE POLICY "Allow public read access for projects" 
    ON projects FOR SELECT 
    USING (true);

-- 2. Restrict insert/update/delete to authenticated admin users
CREATE POLICY "Allow write operations for authenticated users only on projects" 
    ON projects FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- Set up security policies for certificates
-- 1. Allow everyone (public/unauthenticated) read access
CREATE POLICY "Allow public read access for certificates" 
    ON certificates FOR SELECT 
    USING (true);

-- 2. Restrict insert/update/delete to authenticated admin users
CREATE POLICY "Allow write operations for authenticated users only on certificates" 
    ON certificates FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);
