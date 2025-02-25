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
