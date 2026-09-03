from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_role
from app.database.session import get_db

from app.models.user import User
from app.models.student import Student
from app.models.skill import StudentSkill

from pydantic import BaseModel


router = APIRouter(
    prefix="/skills",
    tags=["Student Skills"]
)


# -------------------------------------------------
# SCHEMA
# -------------------------------------------------

class SkillCreate(BaseModel):
    skill_name: str
    proficiency: str | None = None


# -------------------------------------------------
# ADD SKILL
# -------------------------------------------------

@router.post("")
def add_skill(
    skill_data: SkillCreate,
    current_user: User = Depends(require_role("student")),
    db: Session = Depends(get_db)
):

    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    existing_skill = db.query(StudentSkill).filter(
        StudentSkill.student_id == student.id,
        StudentSkill.skill_name == skill_data.skill_name
    ).first()

    if existing_skill:
        raise HTTPException(
            status_code=400,
            detail="Skill already added"
        )

    new_skill = StudentSkill(
        student_id=student.id,
        skill_name=skill_data.skill_name,
        proficiency=skill_data.proficiency
    )

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill


# -------------------------------------------------
# GET MY SKILLS
# -------------------------------------------------

@router.get("")
def get_my_skills(
    current_user: User = Depends(require_role("student")),
    db: Session = Depends(get_db)
):

    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    skills = db.query(StudentSkill).filter(
        StudentSkill.student_id == student.id
    ).all()

    return skills


# -------------------------------------------------
# DELETE SKILL
# -------------------------------------------------

@router.delete("/{skill_id}")
def delete_skill(
    skill_id: int,
    current_user: User = Depends(require_role("student")),
    db: Session = Depends(get_db)
):

    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    skill = db.query(StudentSkill).filter(
        StudentSkill.id == skill_id,
        StudentSkill.student_id == student.id
    ).first()

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    db.delete(skill)
    db.commit()

    return {
        "message": "Skill deleted successfully"
    }