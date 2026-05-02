import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';// for importing authRoutes
import maidRoutes from "./routes/maidRoutes.js";// for importing maidRoutes
import requestRoutes from "./routes/requestRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());


//test route

app.get("/",(req,res)=>{
    res.json({message:"GrihSahayak API is working"});
});

app.use("/api/auth", authRoutes);// for importing authRoutes
app.use("/api/maids", maidRoutes); // for importing maidRoutes
app.use("/api/requests", requestRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user-profile", userProfileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);


export default app;