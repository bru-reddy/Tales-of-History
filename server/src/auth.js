import jwt from "jsonwebtoken";
export function signUser(user) { return jwt.sign({ id: user._id.toString(), name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" }); }
export function auth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ message: "Invalid or expired token" }); }
}
