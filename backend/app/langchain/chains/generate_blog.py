"""
This file contains the chain for generating a blog post from user-specified data.
"""

import os

from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

load_dotenv()

# TODO: Refactor to own module
SYSTEM_PROMPT = """
You are a professional writer and editor crafting high-quality blog posts for a human audience. Your writing should reflect natural, thoughtful expression, like that of an experienced blogger or journalist with a distinctive but subtle voice.

Given a topic and optional keywords or details, write a blog post that is clear, engaging, and original. Avoid the telltale signs of AI writing:

- Do **not** default to numbered or bullet-point lists unless they naturally suit the topic. Use narrative structure instead.
- Avoid formulaic phrasing like:  
  - "This isn't just X — it's Y with Z."  
  - "Let's dive in."  
  - "In today's blog, we'll explore..."  
  - "Whether you're a beginner or expert..."  
  - "Here are 10 ways to…" unless explicitly appropriate.
- Avoid overuse of transitions like "That said," "In conclusion," and "But here's the twist."
- Do not summarize or restate the prompt in the intro.

Aim for subtlety and originality. Favor clarity over cleverness, depth over breadth, and nuance over simplification. Assume a thoughtful reader; don't overexplain.

Use varied sentence structure, vivid but appropriate metaphors, and a natural rhythm. Where relevant, include concrete details, anecdotes, or lightly opinionated insight to make the piece feel human.

If no keywords or special instructions are given beyond the topic, interpret it creatively and write a post that could plausibly appear on a personal blog, magazine site, or publication like "The Atlantic" or "Vox" — depending on tone.

The blog post should be 1000-1500 words in length and formatted in markdown with a title and one or two section headings. Do not put a heading on the conclusion.

"""


def generate_blog(
    topic: str,
    keywords: list[str] = None,
    details: str = None,
    model: str = "gpt-4.1",
    temperature: float = 0.7,
    stream: bool = False,
):
    """
    Generate a blog post from user-specified data.
    """
    temperature = 0.9
    top_p = 0.9
    frequency_penalty = 0.5
    presence_penalty = 0.5
    # max_tokens = 5000
    llm = ChatOpenAI(
        model=model,
        temperature=temperature,
        top_p=top_p,
        frequency_penalty=frequency_penalty,
        presence_penalty=presence_penalty,
        # max_tokens=max_tokens,
        streaming=stream,
    )

    # TODO: Refactor to own module
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessagePromptTemplate.from_template(
                "Topic: {topic}\n"
                "{{% if keywords %}}Keywords: {keywords}{{% endif %}}\n"
                "{{% if details %}}Details: {details}{{% endif %}}\n"
            ),
        ]
    )

    chain = prompt | llm | StrOutputParser() if stream else prompt | llm

    input_data = {
        "topic": topic,
        "keywords": "" if not keywords else ", ".join(keywords),
        "details": details if details else "",
    }

    return chain.stream(input_data) if stream else chain.invoke(input_data)


# Testing/demo purposes
if __name__ == "__main__":
    BLOG_TOPIC = "The future of AI"
    for chunk in generate_blog(BLOG_TOPIC, stream=True):
        print(chunk, end="", flush=True)

    # BLOG_KEYWORDS = ["AI", "future", "technology"]
    # BLOG_DETAILS = "The future of AI is bright. It will change the world in a way that we can't even imagine."

    # print(generate_blog(BLOG_TOPIC, BLOG_KEYWORDS, BLOG_DETAILS))
