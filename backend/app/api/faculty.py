from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_role
from app.database.session import get_db
from app.models.user import User
from app.models.faculty import Faculty
from app.schemas.user import (
    FacultyProfileCreate,
    FacultyProfileResponse
)


router = APIRouter(
    prefix="/faculty",
    tags=["Faculty"]
)


@router.get("/profile")
def get_faculty_profile(
    current_user: User = Depends(require_role("faculty")),
    db: Session = Depends(get_db)
):

    profile = db.query(Faculty).filter(
        Faculty.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Faculty profile not found"
        )

    return {
        "user_id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "department": profile.department,
        "designation": profile.designation,
        "institution": profile.institution,
        "specialization": profile.specialization,
        "bio": profile.bio
    }


@router.post(
    "/profile",
    response_model=FacultyProfileResponse
)
def create_faculty_profile(
    profile_data: FacultyProfileCreate,
    current_user: User = Depends(require_role("faculty")),
    db: Session = Depends(get_db)
):

    existing_profile = db.query(Faculty).filter(
        Faculty.user_id == current_user.id
    ).first()

    if existing_profile:
        return existing_profile

    new_profile = Faculty(
        user_id=current_user.id,
        department=profile_data.department,
        designation=profile_data.designation,
        institution=profile_data.institution,
        specialization=profile_data.specialization,
        bio=profile_data.bio
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


@router.put(
    "/profile",
    response_model=FacultyProfileResponse
)
def update_faculty_profile(
    profile_data: FacultyProfileCreate,
    current_user: User = Depends(require_role("faculty")),
    db: Session = Depends(get_db)
):

    profile = db.query(Faculty).filter(
        Faculty.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Faculty profile not found"
        )

    profile.department = profile_data.department
    profile.designation = profile_data.designation
    profile.institution = profile_data.institution
    profile.specialization = profile_data.specialization
    profile.bio = profile_data.bio

    db.commit()
    db.refresh(profile)

    return profile