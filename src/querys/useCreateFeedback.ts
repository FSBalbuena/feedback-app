import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/configs/apiClient";

export const useCreateFeedback = () => {
  return useMutation({
    mutationFn: (intentions) => {
      return apiClient
        .post("/feedback", { intentions })
        .then((res) => res.data);
    },
  });
};
