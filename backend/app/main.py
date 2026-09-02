from fastapi import FastAPI

from app.database.connection import Base, engine
from app.models.user import User


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Academia-Industry Collaboration Portal",
    description="Backend API for Academia-Industry Collaboration Portal",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Academia-Industry Collaboration Portal Backend is running!"
    }