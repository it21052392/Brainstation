import asyncio
import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

MAX_RETRIES = 3
INITIAL_RETRY_DELAY = 1
MAX_RETRY_DELAY = 10

content_cache = {}
gpt_content_cache = {}

async def expand_content_with_gpt(content):
    if content in gpt_content_cache:
        return gpt_content_cache[content]  # Return cached result if available
    
    try:
        print('in expand_content_with_gpt before openai')
        response = await openai.ChatCompletion.acreate(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a highly proficient technical expert in computer science and information technology who ia an educator for undergraduate students with ADHD students."},
                {"role": "system", "content": "You have to Provide concise, textbook-style explanations in plain text with proper formatting"},
                {"role": "system", "content": "You have to avoid breaking the explanations into sub bullet points"},
                {"role": "system", "content": "All the explanations you give must be limited to a maximum of 40 words"},
                {"role": "system", "content": "All the explanations should be ADHD friendly"},
                {"role": "user", "content": f"Explain this: {content}"}
            ],
            max_tokens=300,
            temperature=0.7
        )
        result = response['choices'][0]['message']['content'].strip()
        gpt_content_cache[content] = result
        return result
    except Exception as e:
        return f"Error: {str(e)}. Original: {content}"

async def expand_content_batch(batch):
    tasks = [expand_single_content(content) for content in batch]
    return await asyncio.gather(*tasks)

async def expand_single_content(content):
    if content in content_cache:
        return content_cache[content]  # If it's already processed, return the cached content

    # We run the expansion process only once for each content
    expanded_content = await expand_content_with_gpt(content)
    content_cache[content] = expanded_content  # Cache the result to avoid reuse issues
    return expanded_content