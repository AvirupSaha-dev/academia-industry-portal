from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_role
from app.database.session import get_db
from app.models.user import User
from app.models.student import Student
from app.schemas.user import (
    StudentProfileCreate,
    StudentProfileResponse
)


router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.get("/profile")
def get_student_profile(
    current_user: User = Depends(require_role("student")),
    db: Session = Depends(get_db)
):

    profile = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    return {
        "user_id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "college": profile.college,
        "course": profile.course,
        "year": profile.year,
        "bio": profile.bio
    }


@router.post(
    "/profile",
    response_model=StudentProfileResponse
)
def create_student_profile(
    profile: StudentProfileCreate,
    current_user: User = Depends(require_role("student")),
    db: Session = Depends(get_db)
):

    existing_profile = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if existing_profile:
        return existing_profile

    new_profile = Student(
        user_id=current_user.id,
        college=profile.college,
        course=profile.course,
        year=profile.year,
        bio=profile.bio
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


@router.put(
    "/profile",
    response_model=StudentProfileResponse
)
def update_student_profile(
    profile_data: StudentProfileCreate,
    current_user: User = Depends(require_role("student")),
    db: Session = Depends(get_db)
):

    profile = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    profile.college = profile_data.college
    profile.course = profile_data.course
    profile.year = profile_data.year
    profile.bio = profile_data.bio

    db.commit()
    db.refresh(profile)

    return profile