from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        nullable=False
    )

    opportunity_id = Column(
        Integer,
        ForeignKey("opportunities.id"),
        nullable=False
    )

    status = Column(
        String,
        nullable=False,
        default="pending"
    )

    resume = Column(Text, nullable=True)

    cover_letter = Column(Text, nullable=True)

    student = relationship("Student")

    opportunity = relationship("Opportunity")