from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    department = Column(String, nullable=True)
    designation = Column(String, nullable=True)
    institution = Column(String, nullable=True)
    specialization = Column(String, nullable=True)
    bio = Column(String, nullable=True)

    user = relationship("User")