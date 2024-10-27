import openai
from fastapi import HTTPException
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

async def generate_alternative_questions(original_questions, num_alternatives=6):
    try:
        prompt = f"Generate {num_alternatives} alternative questions for each of the following:\n"
        for question in original_questions:
            prompt += f"- {question}\n"

        response = await openai.ChatCompletion.acreate(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a creative assistant specializing in developing ADHD-friendly educational content and survey questions."},
                {"role": "system", "content": "You should provide alternative questions that are clear, concise, and closely related to the original question's intent."},
                {"role": "system", "content": "Each question should be phrased to maintain simplicity, while being ADHD-friendly."},
                {"role": "system", "content": f"Generate exactly {num_alternatives} alternative questions without any additional explanations or formatting."},
                {"role": "user", "content": f"{prompt}"}
            ],
            max_tokens=300,
            n=1,
            stop=None,
            temperature=0.7
        )
        # Extract the content from the response
        content = response.choices[0].message.content

        # Split the content by lines and filter out empty lines
        alternatives = [line.strip() for line in content.split("\n") if line.strip()]

        # Return only the first 7 alternatives, if there are more than needed
        return alternatives[:num_alternatives]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating questions: {str(e)}")
