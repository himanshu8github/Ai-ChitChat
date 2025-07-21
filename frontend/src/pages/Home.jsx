import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900 flex flex-col items-center justify-center text-white px-4">

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Welcome to <span className="text-yellow-300">AI-Chat</span>
        </h1>


        <p className="text-lg md:text-xl text-center max-w-xl mb-6">
          Your intelligent chatbot companion. Where would you like to begin?
        </p>


        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold py-2 px-6 rounded-xl transition duration-300"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-white hover:bg-gray-200 text-purple-800 font-semibold py-2 px-6 rounded-xl transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
