from sqlalchemy import Column, Integer, Text
from app.core.database import Base

class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)