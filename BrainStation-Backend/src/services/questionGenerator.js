import axios from 'axios';
import OpenAI from 'openai';
import extractJsonArray from '@/helpers/extractJsonArray';
import { removeHTML } from '@/helpers/removeHTML';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateQuetionLabel = async (content, answer) => {
  const question = await axios.post(`${process.env.QUESTION_GENERATION_URL}/getquestion`, {
    content,
    answer
  });

  return question;
};

export const generateQuestions = async (slides) => {
  // Sanitize the HTML content of slides
  const sanitizedSlides = slides.map((slide) => ({
    id: slide.id,
    title: slide.title,
    content: removeHTML(slide.content)
  }));

  const messages = [
    {
      role: 'system',
      content:
        'You are a helpful assistant that generates educational questions from provided slide content. Output only JSON, no additional text.'
    },
    {
      role: 'system',
      content: `Here are the sanitized slides: ${JSON.stringify(sanitizedSlides)}.`
    },
    {
      role: 'system',
      content:
        'Please generate a questions array based on the slide content provided. Ensure that between 21 and 25 questions are generated.'
    },
    {
      role: 'system',
      content:
        'Ensure the questions are relevant to the content of the slides. Avoid generating questions from unrelated topics, such as methods of delivery or assessment criteria.'
    },
    {
      role: 'system',
      content:
        'Format your output as valid JSON. For example: [{"context": "...", "question": "...", "alternative_questions": ["...", "...", "..."], "answer": "...", "distractors": ["...", "...", "..."]}]. Ensure that exactly 3 distractors are provided for each question.'
    },
    {
      role: 'system',
      content: 'Context should be a bit of content from the slide, and also it should be descriptive.'
    },
    {
      role: 'system',
      content:
        'Make sure that the distractors also have identical lengths to the actual answer; otherwise, students can easily guess the correct answer.'
    },
    {
      role: 'system',
      content: 'The questions should be of intermediate or advanced difficulty.'
    },
    {
      role: 'user',
      content: 'Number of questions should not be less than 21, and should not be more than 25.'
    }
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: messages
  });

  const responseMessage = response.choices[0].message.content;

  return extractJsonArray(responseMessage);
};
