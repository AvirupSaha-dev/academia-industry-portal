from fastapi import FastAPI

from app.database.connection import Base, engine

from app.models.user import User
from app.models.student import Student
from app.models.industry import Industry
from app.models.faculty import Faculty
from app.models.opportunity import Opportunity
from app.models.application import Application
from app.models.skill import StudentSkill

from app.api.auth import router as auth_router
from app.api.students import router as students_router
from app.api.industries import router as industries_router
from app.api.faculty import router as faculty_router
from app.api.opportunities import router as opportunities_router
from app.api.applications import router as applications_router
from app.api.skills import router as skills_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Academia-Industry Collaboration Portal",
    description="Backend API for Academia-Industry Collaboration Portal",
    version="1.0.0"
)


app.include_router(auth_router)
app.include_router(students_router)
app.include_router(industries_router)
app.include_router(faculty_router)
app.include_router(opportunities_router)
app.include_router(applications_router)
app.include_router(skills_router)


@app.get("/")
def home():
    return {
        "message": "Academia-Industry Collaboration Portal Backend is running!"
    }