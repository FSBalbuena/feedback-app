import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Intentions are required" });
      }

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        store: false,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      });

      return res
        .status(200)
        .json({ reply: chatCompletion.choices[0]?.message?.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong creating feedback" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
