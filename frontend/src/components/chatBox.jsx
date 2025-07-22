import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: message,
      });

      setChat([
        ...chat,
        { from: "user", text: message },
        { from: "bot", text: res.data.reply },
      ]);
      setMessage("");
    } catch (err) {
      console.error("Chat API error:", err.response?.data || err.message);
      alert("Something went wrong! Check console.");
    }
  };

  // Clean and split text into normal text and code blocks
  const cleanResponse = (text) => {
    const parts = [];
    const codeBlockRegex = /```([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Push text before code block (clean markdown formatting)
      const before = text.slice(lastIndex, match.index)
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/^[-*]\s+/gm, "")
        .replace(/(\n){3,}/g, "\n\n")
        .trim();
      if (before) parts.push({ type: "text", content: before });

      // Push code block content
      parts.push({ type: "code", content: match[1].trim() });
      lastIndex = codeBlockRegex.lastIndex;
    }

    // Push remaining text after last code block
    const after = text.slice(lastIndex)
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^[-*]\s+/gm, "")
      .replace(/(\n){3,}/g, "\n\n")
      .trim();
    if (after) parts.push({ type: "text", content: after });

    return parts;
  };

  // Render cleaned response parts as JSX with formatting
  const renderCleanedText = (text) => {
    const parts = cleanResponse(text);
    return parts.map((part, idx) => {
      if (part.type === "code") {
        return (
          <pre
            key={idx}
            className="bg-gray-100 p-3 rounded-md overflow-x-auto whitespace-pre-wrap"
          >
            <code>{part.content}</code>
          </pre>
        );
      }
      // For normal text, preserve line breaks
      return (
        <p key={idx} style={{ whiteSpace: "pre-wrap", marginBottom: "1em" }}>
          {part.content}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f0f4f8]">
    
      <Navbar />
      {/* Chat Area */}
      <div className="flex-1 flex flex-col w-full px-4 py-6">
        <div className="flex-1 overflow-y-auto space-y-3">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[90%] ${
                msg.from === "user"
                  ? "ml-auto bg-blue-100 text-right text-blue-900"
                  : "mr-auto bg-slate-100 text-left text-slate-800"
              }`}
            >
              {msg.from === "bot"
                ? renderCleanedText(msg.text)
                : msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask BlueBot anything..."
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
