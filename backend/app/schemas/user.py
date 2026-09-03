from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str


class UserLogin(BaseModel):
    email: str
    password: str


# ---------------- STUDENT ----------------

class StudentProfileCreate(BaseModel):
    college: str | None = None
    course: str | None = None
    year: str | None = None
    bio: str | None = None


class StudentProfileResponse(BaseModel):
    id: int
    user_id: int
    college: str | None = None
    course: str | None = None
    year: str | None = None
    bio: str | None = None

    class Config:
        from_attributes = True


# ---------------- INDUSTRY ----------------

class IndustryProfileCreate(BaseModel):
    company_name: str
    industry_type: str | None = None
    location: str | None = None
    website: str | None = None
    description: str | None = None


class IndustryProfileResponse(BaseModel):
    id: int
    user_id: int
    company_name: str
    industry_type: str | None = None
    location: str | None = None
    website: str | None = None
    description: str | None = None

    class Config:
        from_attributes = True


# ---------------- FACULTY ----------------

class FacultyProfileCreate(BaseModel):
    department: str | None = None
    designation: str | None = None
    institution: str | None = None
    specialization: str | None = None
    bio: str | None = None


class FacultyProfileResponse(BaseModel):
    id: int
    user_id: int
    department: str | None = None
    designation: str | None = None
    institution: str | None = None
    specialization: str | None = None
    bio: str | None = None

    class Config:
        from_attributes = True


# ---------------- OPPORTUNITY ----------------

class OpportunityCreate(BaseModel):
    title: str
    description: str
    opportunity_type: str
    location: str | None = None
    skills_required: str | None = None
    stipend: str | None = None
    duration: str | None = None
    deadline: str | None = None


class OpportunityResponse(BaseModel):
    id: int
    industry_id: int
    title: str
    description: str
    opportunity_type: str
    location: str | None = None
    skills_required: str | None = None
    stipend: str | None = None
    duration: str | None = None
    deadline: str | None = None

    class Config:
        from_attributes = True


# ---------------- APPLICATION ----------------

class ApplicationCreate(BaseModel):
    opportunity_id: int
    resume: str | None = None
    cover_letter: str | None = None


class ApplicationResponse(BaseModel):
    id: int
    student_id: int
    opportunity_id: int
    status: str
    resume: str | None = None
    cover_letter: str | None = None

    class Config:
        from_attributes = True