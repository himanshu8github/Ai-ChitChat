import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignup = async () => {
    try {
      // Firebase signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = userCredential.user.uid;

      // Send otp from backend
      await axios.post("http://localhost:5000/api/user/send-otp", {
        name,
        username,
        email,
        uid,
      });

      alert("OTP sent to your email!");
      navigate("/verify-otp", { state: { uid, email } });
      
      
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>

      <input
        className="border p-2 m-2"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-purple-600 text-white px-6 py-2 rounded mt-4"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
