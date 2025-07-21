import axios from 'axios';

export const getGeminiResponse = async (prompt) => {
  const endpoint = '"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"';

const cleanPrompt = `Reply in plain text. Do not use markdown or bullet points. Just give a short, clean answer. Here's the question: ${prompt}`;

  const res = await axios.post(`${endpoint}?key=${process.env.GEMINI_API_KEY}`, {
    contents: [{ parts: [{ text: cleanPrompt }] }],
  });
  
  return res.data.candidates[0].content.parts[0].text;
};
