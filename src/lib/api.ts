const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
console.log('Using API URL:', API_URL);

export interface Project {
    id?: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    category: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    status: 'completed' | 'in-progress' | 'planned';
    date?: string;
    duration?: string;
    client?: string;
    features?: string[];
    technologies?: Record<string, string[]>;
    metrics?: Record<string, string>;
    featured?: boolean;
}

export const api = {
    getProjects: async (): Promise<Project[]> => {
        const response = await fetch(`${API_URL}/projects`);
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return response.json();
    },

    createProject: async (project: Project): Promise<Project> => {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });
        if (!response.ok) {
            throw new Error('Failed to create project');
        }
        const data = await response.json();
        return data[0];
    },

    deleteProject: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    },

    getCertificates: async (): Promise<Certificate[]> => {
        const response = await fetch(`${API_URL}/certificates`);
        if (!response.ok) {
            throw new Error('Failed to fetch certificates');
        }
        return response.json();
    },

    createCertificate: async (certificate: Certificate): Promise<Certificate> => {
        const response = await fetch(`${API_URL}/certificates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(certificate),
        });
        if (!response.ok) {
            throw new Error('Failed to create certificate');
        }
        const data = await response.json();
        return data[0];
    },

    deleteCertificate: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/certificates/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete certificate');
        }
    },

    getCertificateBySlug: async (slug: string): Promise<Certificate> => {
        const response = await fetch(`${API_URL}/certificates/${slug}`);
        if (!response.ok) {
            throw new Error('Failed to fetch certificate');
        }
        return response.json();
    },
};

export interface Certificate {
    id?: string;
    slug: string;
    title: string;
    issuer: string;
    date: string;
    image: string;
    description: string;
    credentialUrl: string;
    longDescription?: string;
    skills?: string[];
    duration?: string;
    level?: string;
    modules?: string[];
}
