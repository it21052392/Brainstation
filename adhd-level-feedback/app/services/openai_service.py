import openai
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

async def generate_feedback_and_advice(designation):
    prompt = [
        {"role": "system", "content": "You are a mental health assistant specializing in providing feedback and practical advice for individuals with ADHD."},
        {"role": "system", "content": "Provide feedback that is clear, empathetic, and tailored to the user's specific ADHD designation."},
        {"role": "system", "content": "Each response should include a brief explanation of the user's current status and practical advice to improve their level. Keep the language supportive and ADHD-friendly."},
        {"role": "system", "content": "Limit the response to maximum of 50 words and keep it concise and focused and give it in plain text."},
        {"role": "user", "content": f"Give feedback and advice for a user with the following ADHD designation: '{designation}'"}
    ]

    response = await openai.ChatCompletion.acreate(
        model="gpt-4o-mini",
        messages=prompt,
        max_tokens=150,
        temperature=0.7
    )

    print(response)

    return response.choices[0].message.content.strip()
