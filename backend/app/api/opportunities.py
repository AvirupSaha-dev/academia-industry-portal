from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_current_user, require_role
from app.database.session import get_db

from app.models.user import User
from app.models.industry import Industry
from app.models.opportunity import Opportunity

from app.schemas.user import (
    OpportunityCreate,
    OpportunityResponse
)


router = APIRouter(
    prefix="/opportunities",
    tags=["Opportunities"]
)


# -------------------------------------------------
# CREATE OPPORTUNITY
# -------------------------------------------------

@router.post(
    "",
    response_model=OpportunityResponse
)
def create_opportunity(
    opportunity_data: OpportunityCreate,
    current_user: User = Depends(require_role("industry")),
    db: Session = Depends(get_db)
):

    industry = db.query(Industry).filter(
        Industry.user_id == current_user.id
    ).first()

    if not industry:
        raise HTTPException(
            status_code=404,
            detail="Industry profile not found"
        )

    new_opportunity = Opportunity(
        industry_id=industry.id,
        title=opportunity_data.title,
        description=opportunity_data.description,
        opportunity_type=opportunity_data.opportunity_type,
        location=opportunity_data.location,
        skills_required=opportunity_data.skills_required,
        stipend=opportunity_data.stipend,
        duration=opportunity_data.duration,
        deadline=opportunity_data.deadline
    )

    db.add(new_opportunity)
    db.commit()
    db.refresh(new_opportunity)

    return new_opportunity


# -------------------------------------------------
# GET ALL OPPORTUNITIES
# -------------------------------------------------

@router.get(
    "",
    response_model=list[OpportunityResponse]
)
def get_all_opportunities(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    opportunities = db.query(Opportunity).all()

    return opportunities


# -------------------------------------------------
# GET SINGLE OPPORTUNITY
# -------------------------------------------------

@router.get(
    "/{opportunity_id}",
    response_model=OpportunityResponse
)
def get_opportunity(
    opportunity_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    opportunity = db.query(Opportunity).filter(
        Opportunity.id == opportunity_id
    ).first()

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    return opportunity


# -------------------------------------------------
# UPDATE OPPORTUNITY
# -------------------------------------------------

@router.put(
    "/{opportunity_id}",
    response_model=OpportunityResponse
)
def update_opportunity(
    opportunity_id: int,
    opportunity_data: OpportunityCreate,
    current_user: User = Depends(require_role("industry")),
    db: Session = Depends(get_db)
):

    industry = db.query(Industry).filter(
        Industry.user_id == current_user.id
    ).first()

    if not industry:
        raise HTTPException(
            status_code=404,
            detail="Industry profile not found"
        )

    opportunity = db.query(Opportunity).filter(
        Opportunity.id == opportunity_id
    ).first()

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    # Make sure this opportunity belongs to this industry
    if opportunity.industry_id != industry.id:
        raise HTTPException(
            status_code=403,
            detail="You can only update your own opportunities"
        )

    opportunity.title = opportunity_data.title
    opportunity.description = opportunity_data.description
    opportunity.opportunity_type = opportunity_data.opportunity_type
    opportunity.location = opportunity_data.location
    opportunity.skills_required = opportunity_data.skills_required
    opportunity.stipend = opportunity_data.stipend
    opportunity.duration = opportunity_data.duration
    opportunity.deadline = opportunity_data.deadline

    db.commit()
    db.refresh(opportunity)

    return opportunity


# -------------------------------------------------
# DELETE OPPORTUNITY
# -------------------------------------------------

@router.delete(
    "/{opportunity_id}"
)
def delete_opportunity(
    opportunity_id: int,
    current_user: User = Depends(require_role("industry")),
    db: Session = Depends(get_db)
):

    industry = db.query(Industry).filter(
        Industry.user_id == current_user.id
    ).first()

    if not industry:
        raise HTTPException(
            status_code=404,
            detail="Industry profile not found"
        )

    opportunity = db.query(Opportunity).filter(
        Opportunity.id == opportunity_id
    ).first()

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    # Make sure this opportunity belongs to this industry
    if opportunity.industry_id != industry.id:
        raise HTTPException(
            status_code=403,
            detail="You can only delete your own opportunities"
        )

    db.delete(opportunity)
    db.commit()

    return {
        "message": "Opportunity deleted successfully"
    }