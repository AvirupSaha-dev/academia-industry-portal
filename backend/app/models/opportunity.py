from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)

    industry_id = Column(
        Integer,
        ForeignKey("industries.id"),
        nullable=False
    )

    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    opportunity_type = Column(String, nullable=False)
    location = Column(String, nullable=True)
    skills_required = Column(Text, nullable=True)
    stipend = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    deadline = Column(String, nullable=True)

    industry = relationship("Industry")