import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
  console.log("query");
  console.log(import.meta.env.VITE_OPEN_AI_KEY);
  console.log(import.meta.env.OPEN_AI_CHAT_KEY);
  console.log("-------query-----");
  if (req.method === "POST") {
    const { intentions } = req.body;
    const data = "# markdown example \n" + JSON.stringify(intentions, null, 2);
    res.status(200).json(data);
  }
}
