⚡ Ai-ChitChat Application
A sleek, AI-powered chat platform that supports manual and Google sign-up/login, OTP-based email verification, and smart chat interactions using the Google Gemini API. Built with React, Firebase, Node.js, and Tailwind CSS, it combines modern authentication, intelligent communication, and elegant UI design.

🚀 Key Features
🔐 Manual Signup/Login: Secure user authentication using email & password with Firebase Authentication.

🔑 Google OAuth Login: Quick and seamless login/signup using Google accounts via Firebase.

📧 OTP Email Verification: Custom OTP-based email verification using Nodemailer (backend) after registration.

✅ Real-time Input Validation: Instant validation for email, username, and password fields using RegEx and UI feedback.

🤖 AI Chat: Natural language replies powered by Google Gemini API, handled via a secure backend.

💬 Chat UI: Clean and dynamic messaging interface with code formatting, timestamps, and scrolling.

🎨 Modern Responsive UI: Fully responsive and styled with Tailwind CSS, ensuring a clean experience across devices.

🔁 Protected Routes: Access to chat is restricted until email is verified via OTP.

🛠️ Tech Stack Overview
Technology	Purpose/Usage
React + Vite	Frontend UI, component logic, and state management
React Router	Page navigation (Home / Login / Signup / Chat)
Firebase Auth	Manual + Google authentication flow
Nodemailer	Sends OTP emails for email verification
Node.js + Express	Backend API for AI chat, OTP, and user data handling
Google Gemini API	AI model for generating intelligent chat responses
Axios	HTTP client to connect frontend with backend
Tailwind CSS	Styling and layout for responsive UI
