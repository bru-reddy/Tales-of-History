import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import topicRoutes from "./routes/topics.js";
import aiRoutes from "./routes/ai.js";
import { seedDatabase } from "./seed.js";

const app=express();
app.use(cors({origin:true}));
app.use(express.json());
app.get("/api/health",(_,res)=>res.json({ok:true,service:"tales-of-history"}));
app.use("/api/topics",topicRoutes);
app.use("/api/ai",aiRoutes);
const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGODB_URI).then(async()=>{await seedDatabase();app.listen(port,()=>console.log("Tales of History API on "+port));}).catch(e=>{console.error(e.message);process.exit(1);});
