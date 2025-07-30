import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { gsap } from "gsap";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const buttonGroupRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (buttonGroupRef.current) {
      gsap.from(buttonGroupRef.current.children, {
        opacity: 100,
        y: -10,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [location]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="w-full bg-[#3e0b18] text-white px-4 py-3 flex justify-between items-center shadow-md">
      <h1
        className="text-4xl font-bold cursor-pointer tracking-wide"
        onClick={() => handleNavigate("/")}
      >
        Ai-ChitChat
      </h1>

      <div className="flex gap-3 mt-2" ref={buttonGroupRef}>
        {location.pathname === "/" && (
          <>
            <NavButton onClick={() => handleNavigate("/login")} label="Login" />
            <NavButton onClick={() => handleNavigate("/signup")} label="Signup" />
          </>
        )}

        {location.pathname === "/login" && (
          <>
            <NavButton onClick={() => handleNavigate("/")} label="Home" />
            <NavButton onClick={() => handleNavigate("/signup")} label="Signup" />
          </>
        )}

        {location.pathname === "/signup" && (
          <>
            <NavButton onClick={() => handleNavigate("/")} label="Home" />
            <NavButton onClick={() => handleNavigate("/login")} label="Login" />
          </>
        )}

        {location.pathname.startsWith("/chat") && isLoggedIn && (
          <>
            <NavButton onClick={() => handleNavigate("/")} label="Home" />
            <NavButton onClick={handleLogout} label="Logout" />
          </>
        )}
      </div>
    </nav>
  );
};

// Updated NavButton with matching theme
const NavButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-md bg-white text-[#3e0b18] font-semibold hover:bg-gray-100 hover:text-[#590d22] transition-all duration-200 shadow-sm"
  >
    {label}
  </button>
);

export default Navbar;
