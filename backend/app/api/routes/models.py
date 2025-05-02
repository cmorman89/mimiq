from fastapi import APIRouter
from app.services.llm_service import LLMService
from app.global_settings import API_BASE_URL

router = APIRouter()

# Initialize the service
llm_service = LLMService(api_base_url=API_BASE_URL)

@router.get("/models")
async def get_models():
    return await llm_service.get_available_models()