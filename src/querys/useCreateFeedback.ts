import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../configs/apiClient";
export const useCreateFeedback = () => {
  return useMutation({
    mutationFn: (intentions) => {
      console.log("query");
      console.log(import.meta.env.VITE_OPEN_AI_KEY);
      console.log(import.meta.env.OPEN_AI_CHAT_KEY);
      console.log("-------query-----");
      return apiClient
        .post("/feedback", { intentions })
        .then((res) => res.data);
    },
  });
};
