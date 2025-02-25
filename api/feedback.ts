import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
//import { questionsAndHints, stepsIDs } from "./src/data/steps";
export const steps = [
  {
    id: "context",
    question:
      "What’s the situation or behavior you’d like to give feedback on?",
    hint: "Is this about a work project, a personal relationship, or something else?",
  },
  {
    id: "perspective",
    question:
      "What specifically did the person do or say that stood out to you?",
    hint: "Describe the actions or behaviors you noticed. Were they positive, negative, or mixed?",
  },
  {
    id: "impact",
    question: "How did this behavior affect you, the team, or the project?",
    hint: "Did it help or hinder progress? How did it make you feel?",
  },
  {
    id: "improvement",
    question: "What changes or improvements would you like to see?",
    hint: "Be specific—what could they do differently next time?",
  },
  {
    id: "strengths",
    question: "What did they do well that you’d like to acknowledge?",
    hint: "Even if there are areas for improvement, what positives can you highlight?",
  },
  {
    id: "tone",
    question: "How would you like to deliver this feedback?",
    hint: "Do you want it to be supportive, direct, or collaborative? Are there any sensitivities to keep in mind?",
  },
  {
    id: "outcome",
    question: "What do you hope to achieve with this feedback?",
    hint: "Is your goal to improve performance, strengthen communication, or something else?",
  },
];

export const stepsIDs = steps.map((step) => step.id);

export const questionsAndHints = steps.reduce((text, step) => {
  const { id, question, hint } = step;
  return text + `- ${id}: ${question} --> ${hint}\n`;
}, "");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const makePrompt = (intentions: { [key: string]: string }) => {
  const intentionsToAnswers = stepsIDs.reduce(
    (text: string, id: string) => text + `-${id}: ${intentions[id]}`
  );
  return `You are a helpful and empathetic feedback consultant. Your goal is to help individuals provide constructive feedback that empowers the recipient to grow and thrive. you ask them the next questions to understand the givers pint of views.
 <TOPIC>: <QUESTION> --> <DESCRIPTION>:
${questionsAndHints}

and this are their answers to each topic:
${intentionsToAnswers}

Once the user provides this information, you can:
1. Analyze the Input: Identify key themes (e.g., specific behaviors, impact, desired changes).
2. Generate a Feedback Pitch: Use the information to craft a clear, constructive, and actionable feedback message having this tips on mind:
 2.1 Encourage Dialogue: Invite the recipient to share their thoughts or ask questions
 2.2 Be Empathetic and Respectful
 2.3 Frame feedback from your perspective to avoid sounding accusatory
 2.4 Don’t point out problems—offer suggestions or solutions for improvement.
 2.5 Do not extend too much, use 200 words.
 2.6 Address actions, outcomes, or behaviors, not the individual’s personality or character.
 2.7 Avoid vague statements like "Good job" or "This needs work." Instead, point out exactly what was done well or what needs improvement.
 2.8 Please ensure your feedback is constructive, respectful, and helpful for the recipient’s growth. 
3. Offer Delivery Tips: Suggest the best way to deliver the feedback based on the tone and context.

please generate your content in raw markdown as a plain text.

`;
};

console.log(__dirname);
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const { intentions } = req.body;

      if (!intentions) {
        return res.status(400).json({ error: "Intentions are required" });
      }

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        store: false,
        messages: [{ role: "user", content: makePrompt(intentions) }],
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
