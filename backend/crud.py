from supabase import Client
from . import schemas

def get_projects(db: Client):
    response = db.table("projects").select("*").execute()
    return response.data

def create_project(db: Client, project: schemas.ProjectCreate):
    project_data = project.dict(by_alias=True)
    response = db.table("projects").insert(project_data).execute()
    return response.data

def delete_project(db: Client, project_id: str):
    response = db.table("projects").delete().eq("id", project_id).execute()
    return response.data

def update_project(db: Client, project_id: str, project: schemas.ProjectCreate):
    project_data = project.dict(by_alias=True, exclude_unset=True)
    response = db.table("projects").update(project_data).eq("id", project_id).execute()
    return response.data[0] if response.data else None

def get_certificates(db: Client):
    response = db.table("certificates").select("*").execute()
    return response.data

def create_certificate(db: Client, certificate: schemas.CertificateCreate):
    cert_data = certificate.dict(by_alias=True)
    response = db.table("certificates").insert(cert_data).execute()
    return response.data

def delete_certificate(db: Client, certificate_id: str):
    response = db.table("certificates").delete().eq("id", certificate_id).execute()
    return response.data

def update_certificate(db: Client, certificate_id: str, certificate: schemas.CertificateCreate):
    cert_data = certificate.dict(by_alias=True, exclude_unset=True)
    response = db.table("certificates").update(cert_data).eq("id", certificate_id).execute()
    return response.data[0] if response.data else None

def get_certificate_by_slug(db: Client, slug: str):
    response = db.table("certificates").select("*").eq("slug", slug).execute()
    return response.data[0] if response.data else None
