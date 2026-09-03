from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_role
from app.database.session import get_db
from app.models.user import User
from app.models.industry import Industry
from app.schemas.user import (
    IndustryProfileCreate,
    IndustryProfileResponse
)


router = APIRouter(
    prefix="/industries",
    tags=["Industries"]
)


@router.get("/profile")
def get_industry_profile(
    current_user: User = Depends(require_role("industry")),
    db: Session = Depends(get_db)
):

    profile = db.query(Industry).filter(
        Industry.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Industry profile not found"
        )

    return {
        "user_id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "company_name": profile.company_name,
        "industry_type": profile.industry_type,
        "location": profile.location,
        "website": profile.website,
        "description": profile.description
    }


@router.post(
    "/profile",
    response_model=IndustryProfileResponse
)
def create_industry_profile(
    profile_data: IndustryProfileCreate,
    current_user: User = Depends(require_role("industry")),
    db: Session = Depends(get_db)
):

    existing_profile = db.query(Industry).filter(
        Industry.user_id == current_user.id
    ).first()

    if existing_profile:
        return existing_profile

    new_profile = Industry(
        user_id=current_user.id,
        company_name=profile_data.company_name,
        industry_type=profile_data.industry_type,
        location=profile_data.location,
        website=profile_data.website,
        description=profile_data.description
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


@router.put(
    "/profile",
    response_model=IndustryProfileResponse
)
def update_industry_profile(
    profile_data: IndustryProfileCreate,
    current_user: User = Depends(require_role("industry")),
    db: Session = Depends(get_db)
):

    profile = db.query(Industry).filter(
        Industry.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Industry profile not found"
        )

    profile.company_name = profile_data.company_name
    profile.industry_type = profile_data.industry_type
    profile.location = profile_data.location
    profile.website = profile_data.website
    profile.description = profile_data.description

    db.commit()
    db.refresh(profile)

    return profile