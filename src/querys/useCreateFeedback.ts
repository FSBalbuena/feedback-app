import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/configs/apiClient";
import { questionsAndHints, stepsIDs } from "@data/steps";
import { Intentions } from "@/types/common";

const makePrompt = (intentions: Intentions) => {
  const intentionsToAnswers = stepsIDs.reduce(
    (text: string, id: string) => text + `-${id}: ${intentions[id]}`
  );
  const preamble = `You are a helpful and empathetic feedback consultant. Your goal is to help individuals provide constructive feedback that empowers the recipient to grow and thrive. you ask them the next questions to understand the givers pint of views.
 <TOPIC>: <QUESTION> --> <DESCRIPTION>:
${questionsAndHints}

--------------------------------

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

--------------------------------
you need to write your response as raw markdown

`;
  const message = `Hi here are the answers to your questions:
${intentionsToAnswers}`;

  return { preamble, message };
};

export const useCreateFeedback = () => {
  return useMutation({
    mutationFn: (intentions: Intentions) => {
      return apiClient
        .post("/feedback", { prompt: makePrompt(intentions) })
        .then((res) => res.data?.feedback)
        .catch((err) => {
          console.log(err);
          return "Something went wrong creating feedback";
        });
    },
  });
};
