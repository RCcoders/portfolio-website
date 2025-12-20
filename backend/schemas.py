from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class ProjectBase(BaseModel):
    title: str
    description: str
    longDescription: Optional[str] = None
    image: str
    category: str
    tags: List[str] = []
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    status: str = "completed"
    date: Optional[str] = None
    duration: Optional[str] = None
    client: Optional[str] = None
    features: List[str] = []
    technologies: Dict = {}
    metrics: Dict = {}
    featured: bool = False


class CertificateBase(BaseModel):
    slug: str
    title: str
    issuer: str
    date: str = Field(..., alias="certificate_date")
    image: str
    description: str
    credentialUrl: str = Field(..., alias="credential_url")

    longDescription: Optional[str] = Field(None, alias="long_description")
    skills: List[str] = []
    duration: Optional[str] = None
    level: Optional[str] = None
    modules: List[str] = []

    class Config:
        populate_by_name = True
        from_attributes = True

class CertificateCreate(CertificateBase):
    pass

class Certificate(CertificateBase):
    id: Optional[str] = None
    created_at: Optional[str] = None

    class Config:
        from_attributes = True

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: Optional[str] = None
    created_at: Optional[str] = None

    class Config:
        from_attributes = True
