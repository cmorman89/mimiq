from fastapi import APIRouter
from app.services.service_container import llm_service

router = APIRouter()


@router.get("/models")
async def get_models():
    return await llm_service.get_available_models()
