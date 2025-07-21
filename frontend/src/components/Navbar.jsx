import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const[isLoggedIn, setIsLoggedIn] = useState(false);


     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();  // we clean the function here..(cleanup function)
  }, []);

    const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path); //It takes a path as an argument => "/dashboard", "/profile", 
  };


    return (
    <nav className="w-full bg-purple-800 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => handleNavigate("/")}>
      AI Chat
      </h1>

      <div className="flex gap-4">

        {location.pathname === "/" && (
          <>
            <button onClick={() => handleNavigate("/login")}>Login</button>
            <button onClick={() => handleNavigate("/signup")}>Signup</button>
          </>
        )}


        {location.pathname === "/login" && (
          <>
            <button onClick={() => handleNavigate("/")}>Home</button>
            <button onClick={() => handleNavigate("/signup")}>Signup</button>
          </>
        )}

 
        {location.pathname === "/signup" && (
          <>
            <button onClick={() => handleNavigate("/")}>Home</button>
            <button onClick={() => handleNavigate("/login")}>Login</button>
          </>
        )}

   
        {location.pathname === "/chat" && isLoggedIn && (
          <>
            <button onClick={() => handleNavigate("/")}>Home</button>
            <button onClick={() => handleNavigate("/chat")}>New Chat</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


