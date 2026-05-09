import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';// for importing authRoutes
import maidRoutes from "./routes/maidRoutes.js";// for importing maidRoutes
import requestRoutes from "./routes/requestRoutes.js";// for importing requestRoutes
import reviewRoutes from "./routes/reviewRoutes.js"; // for importing reviewRoutes
import userProfileRoutes from "./routes/userProfileRoutes.js";// for importing userProfileRoutes
import userRoutes from "./routes/userRoutes.js";// for importing userRoutes
import feedbackRoutes from "./routes/feedbackRoutes.js";// for importing feedbackRoutes
import adminRoutes from "./routes/adminRoutes.js";// for importing adminRoutes

const app = express();

app.use(cors());
app.use(express.json());


//test route

app.get("/",(req,res)=>{
    res.json({message:"GrihSahayak API is working"});
});

app.use("/api/auth", authRoutes);// for importing authRoutes
app.use("/api/maids", maidRoutes); // for importing maidRoutes
app.use("/api/requests", requestRoutes);// for importing requestRoutes
app.use("/api/reviews", reviewRoutes);// for importing reviewRoutes
app.use("/api/user-profile", userProfileRoutes);// for importing userProfileRoutes
app.use("/api/users", userRoutes);// for importing userRoutes
app.use("/api/feedback", feedbackRoutes);// for importing feedbackRoutes
app.use("/api/admin", adminRoutes);// for importing adminRoutes


export default app;