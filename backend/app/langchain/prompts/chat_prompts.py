from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain.prompts.chat import AIMessagePromptTemplate

# Basic system message template
SYSTEM_TEMPLATE = """You are a helpful AI assistant. You provide clear, concise, and accurate responses.
Always maintain a professional and friendly tone."""

# Basic human message template
HUMAN_TEMPLATE = "{input}"

# Basic AI message template (for few-shot examples)
AI_TEMPLATE = "{output}"

# Create the message templates
system_message_prompt = SystemMessagePromptTemplate.from_template(SYSTEM_TEMPLATE)
human_message_prompt = HumanMessagePromptTemplate.from_template(HUMAN_TEMPLATE)
ai_message_prompt = AIMessagePromptTemplate.from_template(AI_TEMPLATE)

# Create the chat prompt template
chat_prompt = ChatPromptTemplate.from_messages(
    [system_message_prompt, human_message_prompt]
)

# Create a few-shot chat prompt template (if needed)
few_shot_chat_prompt = ChatPromptTemplate.from_messages(
    [
        system_message_prompt,
        human_message_prompt,
        ai_message_prompt,
        human_message_prompt
    ]
) 