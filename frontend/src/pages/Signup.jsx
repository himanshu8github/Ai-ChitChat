import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  // export const otpStore = {};

  const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

  const handleSignup = async () => {
    if (loading) return;

    if (!name || !username || !email || !pass) {
      alert("Please fill all fields");
      return;
    }

    if (pass.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = userCredential.user.uid;

       const otp = generateOtp();

        await sendEmailVerification(user);

      alert("Verification email sent! Please check your inbox.");

      // Send OTP to backend
    await axios.post("http://localhost:5000/api/user/send-otp", {
     name,
  username,
  email,
  uid,
  otp,        
      signupType: "manual",
    });


      alert("OTP sent to your email!");
      navigate("/verify-otp", { state: { uid, email } });

    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const name = user.displayName || "";
      const email = user.email;
      const uid = user.uid;
      const username = email.split("@")[0];

    // Google signup 
await axios.post("http://localhost:5000/api/user/send-otp", {
 
  email,

  signupType: "google", 
});

      alert("OTP sent to your email!");
      navigate("/verify-otp", { state: { uid, email } });

    } catch (err) {
      console.error("Google Signup Error:", err);
      alert(err.message || "Google Signup failed");
    }
  };

  return (
    <>
      <Navbar /> 
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">Create an Account</h1>

          <input
            className="border p-2 mb-3 w-full rounded"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 mb-3 w-full rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border p-2 mb-3 w-full rounded"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 mb-3 w-full rounded"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700 transition duration-200"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="my-4 text-center text-gray-500">or</div>

          <button
            onClick={handleGoogleSignup}
            className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
