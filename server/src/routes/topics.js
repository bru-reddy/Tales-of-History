import { Router } from "express";
import { Topic } from "../models.js";
const router = Router();

router.get("/", async (req,res)=>{
  const { category, q, era } = req.query;
  const filter = {};
  if (category && category !== "All") filter.category = category;
  if (era && era !== "All") filter.era = era;
  if (q) filter.$or = [{title:new RegExp(q,"i")},{summary:new RegExp(q,"i")},{tags:new RegExp(q,"i")}];
  const topics = await Topic.find(filter).sort({startYear:1});
  res.json(topics);
});
router.get("/:slug", async (req,res)=>{
  const topic = await Topic.findOne({slug:req.params.slug});
  if (!topic) return res.status(404).json({message:"Topic not found"});
  res.json(topic);
});
export default router;
