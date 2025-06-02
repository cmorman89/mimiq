from langchain.prompts import (
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
    ChatPromptTemplate,
)


class BasicPromptBuilder:
    """
    Builds a basic prompt template from a system template, human template, and/or ai template.
    """

    @staticmethod
    def build(system_template, human_template=None, ai_template=None):
        """
        Builds a basic prompt template from a system template, human template, and/or ai template.
        Args:
            system_template (str): The system template to use.
            human_template (str): The human template to use.
            ai_template (str): The ai template to use.
        Returns:
            ChatPromptTemplate: The basic prompt template.
        """
        return ChatPromptTemplate.from_messages(
            BasicPromptBuilder._prompt_messages(
                system_template, human_template, ai_template
            )
        )

    @staticmethod
    def _prompt_messages(system_template, human_template=None, ai_template=None):
        """
        Creates a basic prompt template from a system template, human template, and/or ai template.
        Args:
            system_template (str): The system template to use.
            human_template (str): The human template to use.
            ai_template (str): The ai template to use.
        Returns:
            list: The basic prompt template.
        """
        prompt = [SystemMessagePromptTemplate.from_template(system_template)]
        if human_template:
            prompt.append(HumanMessagePromptTemplate.from_template(human_template))
        if ai_template:
            prompt.append(AIMessagePromptTemplate.from_template(ai_template))
        return prompt
