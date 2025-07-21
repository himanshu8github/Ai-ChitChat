import axios from 'axios';

export const handleChat = async (req, res) => {
  const { message } = req.body;

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ]
      }
    );

    const reply = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply.";
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API error", detail: error.response?.data || error.message });
  }
};
