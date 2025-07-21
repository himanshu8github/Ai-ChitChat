import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email.");
      return false;
    }
    if (pass.length < 6) {
      setError("Password should be at least 6 characters.");
      return false;
    }
    setError(""); 
    return true;
  };


  const sendData = async () => {
    if (!validateInputs()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);

      console.log("Login successful", userCredential.user);
      navigate("/chat");


    } catch (err) {
      console.error(err.message);
      setError("Login failed. Please check your credentials.");
    }
  };



   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 text-white">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          onClick={sendData}
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};




export default Login;