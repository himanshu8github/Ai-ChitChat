import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
        opacity: 0,
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
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        { message }
      );

      const reply = res?.data?.reply;

      if (!reply || typeof reply !== "string") {
        console.error("Unexpected response:", res.data);
        alert("Bot did not respond correctly. Check console for details.");
        return;
      }

      setChat((prevChat) => [
        ...prevChat,
        { from: "user", text: message },
        { from: "bot", text: reply },
      ]);
      setMessage("");
    } catch (err) {
      console.error("Chat API error:", err.response?.data || err.message);
      alert("Something went wrong! Check console.");
    }
  };

  const handleNewChat = () => setChat([]);

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
    if (typeof text !== "string") return null;

    const parts = cleanResponse(text);
    return parts.map((part, idx) => {
      if (part.type === "code") {
        return (
          <pre
            key={idx}
            className="bg-gray-200 text-gray-900 p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-xs md:text-sm"
          >
            <code>{part.content}</code>
          </pre>
        );
      }
      return (
        <p
          key={idx}
          className="text-[#590d22] font-semibold whitespace-pre-wrap text-sm md:text-base"
        >
          {part.content}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#590d22] text-white">
      <Navbar />
      <main className="flex-1 flex flex-col px-4 py-4 sm:px-6 sm:py-6 max-w-4xl mx-auto w-full">
        {/* Chat Window */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin scrollbar-thumb-[#9d0208] scrollbar-track-[#800f2f]/40"
        >
          {chat.length === 0 && (
            <p className="text-center text-white/60 mt-10 select-none">
              Start chatting with Ai-ChitChat...
            </p>
          )}
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 sm:p-4 rounded-xl max-w-[90%] break-words ${
                msg.from === "user"
                  ? "ml-auto bg-[#9d0208] text-right text-white font-bold"
                  : "mr-auto bg-[#ffccd5] text-left text-[#590d22] font-semibold"
              }`}
            >
              {msg.from === "bot" ? renderCleanedText(msg.text) : msg.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Ai-ChitChat anything..."
            className="flex-1 rounded-md border border-[#800f2f] bg-white text-black placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#9d0208] text-sm sm:text-base"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-[#9d0208] hover:bg-[#6a040f] transition-colors text-white rounded-md px-4 py-2 text-sm sm:px-6 sm:text-base font-semibold"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChatBox;
