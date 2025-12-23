from fastapi import FastAPI, HTTPException, APIRouter
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from . import crud, schemas, database

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://portfolio-website-rccoders.vercel.app", # Add generic Vercel domain or specific one if known
    "*" # Allow all for now to avoid CORS issues on deployment
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

@api_router.get("/")
def read_root():
    return {"message": "Portfolio Backend is running"}

@api_router.get("/projects")
def get_projects():
    return crud.get_projects(database.supabase)

@api_router.post("/projects", response_model=List[schemas.Project])
def create_project(project: schemas.ProjectCreate):
    return crud.create_project(database.supabase, project)

@api_router.delete("/projects/{project_id}")
def delete_project(project_id: str):
    return crud.delete_project(database.supabase, project_id)

@api_router.get("/certificates")
def get_certificates():
    return crud.get_certificates(database.supabase)

@api_router.post("/certificates", response_model=List[schemas.Certificate])
def create_certificate(certificate: schemas.CertificateCreate):
    return crud.create_certificate(database.supabase, certificate)

@api_router.delete("/certificates/{certificate_id}")
def delete_certificate(certificate_id: str):
    return crud.delete_certificate(database.supabase, certificate_id)

@api_router.get("/certificates/{slug}", response_model=schemas.Certificate)
def get_certificate_by_slug(slug: str):
    cert = crud.get_certificate_by_slug(database.supabase, slug)
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return cert

app.include_router(api_router)
