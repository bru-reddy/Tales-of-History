import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models.js";
import { signUser } from "../auth.js";
const router = Router();

router.post("/register", async (req,res)=>{
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({message:"Name, email and password are required"});
    if (password.length < 6) return res.status(400).json({message:"Password must be at least 6 characters"});
    if (await User.findOne({email})) return res.status(409).json({message:"Account already exists"});
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({token: signUser(user), user:{id:user._id,name:user.name,email:user.email}});
  } catch(e){ res.status(500).json({message:"Registration failed"}); }
});
router.post("/login", async (req,res)=>{
  const user = await User.findOne({email:req.body.email?.toLowerCase()});
  if (!user || !(await bcrypt.compare(req.body.password || "", user.passwordHash))) return res.status(401).json({message:"Invalid email or password"});
  res.json({token:signUser(user), user:{id:user._id,name:user.name,email:user.email}});
});
router.get("/me", async (req,res)=>{ res.json({message:"Use /api/auth/me after adding auth middleware if needed"}); });
export default router;
