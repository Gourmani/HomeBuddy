import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';// for importing authRoutes
import maidRoutes from "./routes/maidRoutes.js";// for importing maidRoutes
import requestRoutes from "./routes/requestRoutes.js";
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

export default app;