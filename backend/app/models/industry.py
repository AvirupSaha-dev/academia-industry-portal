from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Industry(Base):
    __tablename__ = "industries"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    company_name = Column(String, nullable=False)
    industry_type = Column(String, nullable=True)
    location = Column(String, nullable=True)
    website = Column(String, nullable=True)
    description = Column(String, nullable=True)

    user = relationship("User")