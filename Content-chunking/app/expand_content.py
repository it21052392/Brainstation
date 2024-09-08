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
                {"role": "system", "content": "You are a highly proficient technical expert in computer science and information technology. Provide concise, textbook-style explanations in plain text with proper formatting and dont breakdown explanations into sub bullet points."},
                {"role": "user", "content": f"Explain this in the context of computer science and information technology in maximum of 50 words: {content}"}
            ],
            max_tokens=300,
            temperature=0.7
        )
        print('in expand_content_with_gpt after openai')
        result = response['choices'][0]['message']['content'].strip()
        gpt_content_cache[content] = result
        return result
    except Exception as e:
        return f"Error: {str(e)}. Original: {content}"

async def expand_content_batch(batch):
    print('in expand_content_batch before expand_single_content')
    tasks = [expand_single_content(content) for content in batch]
    print('in expand_content_batch after expand_single_content')
    return await asyncio.gather(*tasks)

async def expand_single_content(content):
    if content in content_cache:
        return content_cache[content]  # If it's already processed, return the cached content

    # We run the expansion process only once for each content
    print('in expand_single_content before expand_content_with_gpt')
    expanded_content = await expand_content_with_gpt(content)
    print('in expand_single_content after expand_content_with_gpt')
    content_cache[content] = expanded_content  # Cache the result to avoid reuse issues
    return expanded_content