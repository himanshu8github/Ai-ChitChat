import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import gsap from "gsap";

const ChatBox = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
   
    if (chatContainerRef.current) {
      gsap.from(chatContainerRef.current, {
        opacity: 100,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
     axios.post(`${process.env.VITE_BACKEND_URL}/api/chat`, { message });


      setChat((prevChat) => [
        ...prevChat,
        { from: "user", text: message },
        { from: "bot", text: res.data.reply },
      ]);
      setMessage("");

     
    } catch (err) {
      console.error("Chat API error:", err.response?.data || err.message);
      alert("Something went wrong! Check console.");
    }
  };

  const cleanResponse = (text) => {
    const parts = [];
    const codeBlockRegex = /```([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      const before = text
        .slice(lastIndex, match.index)
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/^[-*]\s+/gm, "")
        .replace(/(\n){3,}/g, "\n\n")
        .trim();

      if (before) parts.push({ type: "text", content: before });
      parts.push({ type: "code", content: match[1].trim() });
      lastIndex = codeBlockRegex.lastIndex;
    }

    const after = text
      .slice(lastIndex)
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^[-*]\s+/gm, "")
      .replace(/(\n){3,}/g, "\n\n")
      .trim();

    if (after) parts.push({ type: "text", content: after });

    return parts;
  };

  const renderCleanedText = (text) => {
    const parts = cleanResponse(text);
    return parts.map((part, idx) => {
      if (part.type === "code") {
        return (
          <pre
            key={idx}
            className="bg-gray-100 text-gray-900 p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-sm"
          >
            <code>{part.content}</code>
          </pre>
        );
      }
      return (
        <p
          key={idx}
          style={{ whiteSpace: "pre-wrap", marginBottom: "1em" }}
          className="text-black font-bold"
        >
          {part.content}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      <Navbar />
      <main className="flex-1 flex flex-col px-6 py-6 max-w-4xl mx-auto w-full">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        >
          {chat.length === 0 && (
            <p className="text-center text-gray-500 mt-10 select-none">
              Start chatting with Ai-ChitChat...
            </p>
          )}
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl max-w-[85%] ${
                msg.from === "user"
                  ? "ml-auto bg-blue-100 text-right text-black font-bold"
                  : "mr-auto bg-gray-100 text-left text-gray-800 font-bold"
              }`}
            >
              {msg.from === "bot" ? renderCleanedText(msg.text) : msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask BlueBot anything..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg px-6 font-semibold flex items-center justify-center"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChatBox;
