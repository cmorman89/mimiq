from app.services.llm_service import LLMService
from app.global_settings import LMSTUDIO_API_BASE_URL

# Initialize services
llm_service = LLMService(api_base_url=LMSTUDIO_API_BASE_URL)
