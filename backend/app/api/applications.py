from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_current_user, require_role
from app.database.session import get_db

from app.models.user import User
from app.models.student import Student
from app.models.industry import Industry
from app.models.opportunity import Opportunity
from app.models.application import Application

from app.schemas.user import (
    ApplicationCreate,
    ApplicationResponse
)


router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


# -------------------------------------------------
# STUDENT APPLIES TO AN OPPORTUNITY
# -------------------------------------------------

@router.post(
    "",
    response_model=ApplicationResponse
)
def create_application(
    application_data: ApplicationCreate,
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

    opportunity = db.query(Opportunity).filter(
        Opportunity.id == application_data.opportunity_id
    ).first()

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    existing_application = db.query(Application).filter(
        Application.student_id == student.id,
        Application.opportunity_id == opportunity.id
    ).first()

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="You have already applied to this opportunity"
        )

    new_application = Application(
        student_id=student.id,
        opportunity_id=opportunity.id,
        status="pending",
        resume=application_data.resume,
        cover_letter=application_data.cover_letter
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application


# -------------------------------------------------
# STUDENT VIEWS THEIR APPLICATIONS
# -------------------------------------------------

@router.get(
    "/my",
    response_model=list[ApplicationResponse]
)
def get_my_applications(
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

    applications = db.query(Application).filter(
        Application.student_id == student.id
    ).all()

    return applications


# -------------------------------------------------
# INDUSTRY VIEWS APPLICATIONS FOR ITS OPPORTUNITIES
# -------------------------------------------------

@router.get(
    "/opportunity/{opportunity_id}",
    response_model=list[ApplicationResponse]
)
def get_opportunity_applications(
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

    if opportunity.industry_id != industry.id:
        raise HTTPException(
            status_code=403,
            detail="You can only view applications for your own opportunities"
        )

    applications = db.query(Application).filter(
        Application.opportunity_id == opportunity.id
    ).all()

    return applications


# -------------------------------------------------
# UPDATE APPLICATION STATUS
# -------------------------------------------------

@router.put(
    "/{application_id}/status",
    response_model=ApplicationResponse
)
def update_application_status(
    application_id: int,
    status: str,
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

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    opportunity = db.query(Opportunity).filter(
        Opportunity.id == application.opportunity_id
    ).first()

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    if opportunity.industry_id != industry.id:
        raise HTTPException(
            status_code=403,
            detail="You can only update applications for your own opportunities"
        )

    allowed_statuses = [
        "pending",
        "shortlisted",
        "accepted",
        "rejected"
    ]

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid application status"
        )

    application.status = status

    db.commit()
    db.refresh(application)

    return application