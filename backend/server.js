import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import chatRoutes from './routes/chat.route.js';
import sendOtpRouter  from "./routes/sendOtp.route.js";
import verifyOtpRouter  from "./routes/verifyOtp.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);
app.use("/api/user/send-otp", sendOtpRouter);
app.use("/api/user/verify-otp", verifyOtpRouter);


console.log("Gemini API Key:", process.env.GEMINI_API_KEY);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
