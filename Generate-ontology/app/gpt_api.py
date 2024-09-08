# app/gpt_api.py
import openai
import os
from dotenv import load_dotenv

load_dotenv()

# Load environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to call GPT-4 API to generate the mindmap in markdown format
async def generate_mindmap(content: str) -> str:
    try:
        prompt = f"""
        You are an expert at generating mindmaps. I will provide you with a list of topics and explanations.
        Please return a structured mindmap in markdown format with central ideas, main branches, and sub-branches.

        Here is the content:

        {content}
        """

        response = await openai.ChatCompletion.acreate(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": (
                        "You are a mindmap expert. Generate a detailed mindmap and it should be formatted in markdown format. "
                        "The mindmap should follow this structure:\n"
                        "# Main Node (Title)\n"
                        "## Subnode 1\n"
                        "- Item 1\n"
                        "- Item 2\n"
                        "## Subnode 2\n"
                        "### Sub-subnode of Subnode 2\n"
                        "- Item 1\n"
                        "- Item 2\n"
                        "### Another Sub-subnode\n"
                        "- Item 1\n"
                        "- Item 2\n"
                        "## Subnode 3\n"
                        "- Item 1\n"
                        "- Item 2\n"
                        "Ensure that the structure is hierarchical with proper headers and bullet points."
                    )},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )

        # Extracting the content from the response
        mindmap_md = response['choices'][0]['message']['content'].strip()
        return mindmap_md

    except Exception as e:
        raise Exception(f"Error generating mindmap: {str(e)}")
