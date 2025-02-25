import { VercelRequest, VercelResponse } from "@vercel/node";

import { CohereClient } from "cohere-ai";

const client = new CohereClient({
  token: "0jowWMuffPhdVg0JDBy6o9HpAGMPKepjDnxTzhAf",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Intentions are required" });
      }

      const chatCompletion = await client.chat({
        message: prompt.message,
        model: "command-r-08-2024",
        preamble: prompt.preamble,
      });

      return res.status(200).json({ feedback: chatCompletion.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong creating feedback" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
