import { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [message, setMessage] = useState('');
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
        { from: 'user', text: message },
        { from: 'bot', text: res.data.reply }
      ]);
      setMessage('');
    } catch (err) {
      console.error('Chat API error:', err.response?.data || err.message);
      alert("Something went wrong! Check console.");
    }
  };

  const cleanResponse = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/[*-] /g, '')
      .replace(/([.?!])\s*/g, '$1\n\n')
      .trim();
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f0f4f8]">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold tracking-wide">BlueBot</h1>
        <div className="space-x-4">
          <button className="bg-white text-[#1e293b] font-medium px-4 py-1 rounded hover:bg-gray-100 transition">
            Home
          </button>
          <button className="bg-red-600 hover:bg-red-700 transition px-4 py-1 rounded text-white font-medium">
            Logout
          </button>
        </div>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col w-full px-4 py-6">
        <div className="flex-1 overflow-y-auto space-y-3">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[90%] ${
                msg.from === 'user'
                  ? 'ml-auto bg-blue-100 text-right text-blue-900'
                  : 'mr-auto bg-slate-100 text-left text-slate-800'
              }`}
            >
              {msg.from === 'bot' ? cleanResponse(msg.text) : msg.text}
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
