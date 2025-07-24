import axios from 'axios';

export const handleChat = async (req, res) => {
  const { message } = req.body;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const cleanPrompt = `Reply in plain text. Do not use markdown or bullet points. Just give a short, clean answer. Here's the question: ${message}`;

    const geminiRes = await axios.post(endpoint, {
      contents: [{ parts: [{ text: cleanPrompt }] }],
    });

    console.log("Gemini raw response:", JSON.stringify(geminiRes.data, null, 2));

    const reply =
      geminiRes?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

 
if (!reply) {
  console.error("Gemini API did not return valid reply:", geminiRes.data);
  return res
    .status(500)
    .json({ error: "No valid reply from Gemini API" });
}

    res.json({ reply });

    
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Gemini API error", detail: error.response?.data || error.message });
  }
};
