"""
LM Studio Chat Model Integration for LangChain

This module provides a custom chat model implementation for LM Studio, allowing integration
with LangChain's chat model interface. It supports both regular and streaming completions.
"""

from typing import Optional, List, Iterator, Any

import json
import httpx
from langchain_core.language_models import BaseChatModel
from langchain_core.messages import AIMessage, AIMessageChunk, BaseMessage, HumanMessage
from langchain_core.outputs import ChatGeneration, ChatGenerationChunk, ChatResult
from langchain_core.callbacks import CallbackManagerForChainRun
from pydantic import Field

# Base URL for the LM Studio API
API_BASE_URL = "http://127.0.0.1:1234"


class LmStudioChatModel(BaseChatModel):
    """
    A custom chat model implementation for LM Studio that integrates with LangChain.

    This class extends BaseChatModel to provide chat completion functionality using
    LM Studio's API. It supports both regular and streaming completions.

    Attributes:
        model_name (str): The name of the model to use for completions
        temperature (Optional[float]): Controls randomness in the output (0.0 to 1.0)
        max_tokens (Optional[int]): Maximum number of tokens to generate
        timeout (Optional[int]): Request timeout in seconds
        stop (Optional[List[str]]): List of stop sequences
        max_retries (int): Maximum number of retry attempts for failed requests
    """

    model_name: str = Field(alias="model")
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    timeout: Optional[int] = None
    stop: Optional[List[str]] = None
    max_retries: int = 2

    def _generate(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForChainRun] = None,
        **kwargs: Any,
    ) -> ChatResult:
        """
        Generate a chat completion response.

        Args:
            messages: List of chat messages to generate a response for
            stop: Optional list of stop sequences
            run_manager: Optional callback manager for tracking the run
            **kwargs: Additional arguments to pass to the API

        Returns:
            ChatResult containing the generated response

        Raises:
            Exception: If the API request fails
        """
        # Format messages for the API
        formatted_messages = [
            {"role": "user", "content": message.content} for message in messages
        ]

        # Prepare the API request payload
        payload = {
            "model": self.model_name,
            "messages": formatted_messages,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
            "timeout": self.timeout,
            "stop": self.stop,
        }

        headers = {
            "Content-Type": "application/json",
        }

        try:
            # Make the API request
            response = httpx.post(
                f"{API_BASE_URL}/v1/chat/completions",
                json=payload,
                headers=headers,
            )
            response.raise_for_status()
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            return ChatResult(
                generations=[ChatGeneration(message=AIMessage(content=content))]
            )
        except Exception as e:
            print(e)
            raise e

    def _stream(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForChainRun] = None,
        **kwargs: Any,
    ) -> Iterator[ChatGenerationChunk]:
        """
        Stream a chat completion response.

        Args:
            messages: List of chat messages to generate a response for
            stop: Optional list of stop sequences
            run_manager: Optional callback manager for tracking the run
            **kwargs: Additional arguments to pass to the API

        Yields:
            ChatGenerationChunk objects containing streamed response chunks

        Raises:
            Exception: If the streaming request fails
        """
        # Format messages for the API
        formatted_messages = [
            {"role": "user", "content": message.content} for message in messages
        ]

        # Prepare the streaming API request payload
        payload = {
            "model": self.model_name,
            "messages": formatted_messages,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
            "timeout": self.timeout,
            "stop": self.stop,
            "stream": True,
        }

        headers = {
            "Content-Type": "application/json",
        }

        try:
            # Stream the API response
            with httpx.stream(
                "POST",
                f"{API_BASE_URL}/v1/chat/completions",
                json=payload,
                headers=headers,
                timeout=self.timeout or 30,
            ) as response:
                response.raise_for_status()
                buffer = ""
                for line in response.iter_lines():
                    if not line:
                        continue
                    if line.startswith("data: "):
                        data = line[len("data: ") :].strip()
                        if data == "[DONE]":
                            break
                        try:
                            # Parse and yield each chunk
                            chunk = json.loads(data)
                            delta = chunk["choices"][0]["delta"].get("content", "")
                            if delta:
                                yield ChatGenerationChunk(
                                    message=AIMessageChunk(content=delta)
                                )
                                if run_manager:
                                    run_manager.on_llm_new_token(delta)
                        except json.JSONDecodeError:
                            continue
        except Exception as e:
            print(f"Streaming error: {e}")
            raise e

    @property
    def _llm_type(self) -> str:
        """Return the type of language model."""
        return "lmstudio"


def get_chat_model(
    temperature: float = 0.7,
    model_name: str = "gemma-3-4b-it",
    api_base_url: Optional[str] = None,
) -> LmStudioChatModel:
    """
    Create and configure a new LmStudioChatModel instance.

    Args:
        temperature: Controls randomness in the output (0.0 to 1.0)
        model_name: The name of the model to use
        api_base_url: Optional custom API base URL

    Returns:
        LmStudioChatModel: Configured chat model instance
    """
    return LmStudioChatModel(
        temperature=temperature,
        model_name=model_name,
        openai_api_base=api_base_url or API_BASE_URL,
    )


# Example usage
if __name__ == "__main__":
    model = LmStudioChatModel(
        temperature=0.7,
        model_name="gemma-3-4b-it",
        api_base_url=API_BASE_URL,
    )

    response = model.invoke("Write a blog post about the benefits of using LM Studio.")
    print("\nFinal full response:\n", response.content)
