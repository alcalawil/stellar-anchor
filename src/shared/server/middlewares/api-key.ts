import { Request as Req, Response as Res, NextFunction as Next } from "express";

export function checkApiKey(req: Req, res: Res, next: Next) {
  const apiKey = req.get("x-api-key");

  if (!apiKey) {
    console.error("Missing Api Key");
    return res.status(401).json({ error: "Missing Api Key" });
  }

  if (apiKey !== process.env.SERVER_API_KEY) {
    console.error("Invalid Api Key");
    return res.status(401).json({ error: "Invalid Api Key" });
  }

  // ok, continue
  next();
}

