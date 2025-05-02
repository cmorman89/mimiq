from typing import List
import httpx

class LLMService:
    """
    Service for interacting with the LLM API.
    Args:
        api_base_url (str): The base URL of the LLM API.
    Attributes:
        api_base_url (str): The base URL of the LLM API.
        api_models_url (str): The URL of the LLM API models endpoint.
        client (httpx.AsyncClient): The HTTP client for making requests to the LLM API.
    """
    def __init__(self, api_base_url: str):

        self.api_base_url = api_base_url
        self.api_models_url = f"{self.api_base_url}/v1/models"
        self.client = httpx.AsyncClient()

    async def get_available_models(self) -> List[str]:
        """
        Fetches available LLM models from the API endpoint.
        Returns a list of model names.
        """
        try:
            response = await self.client.get(self.api_models_url)
            response.raise_for_status()
            data = response.json()
            # If data list is empty, return a message
            if not data:
                return {"data": [{"id": "no_models", "name": "No models available"}]}
            # If data list is not empty, return the data
            return data
        except httpx.HTTPError as e:
            # Handle HTTP errors appropriately
            print(f"Failed to fetch models: {str(e)}")
            # Return a message indicating no connection to the API
            return {"data": [{"id": "no_connection", "name": "No connection to the API"}]}
        finally:
            await self.client.aclose()
