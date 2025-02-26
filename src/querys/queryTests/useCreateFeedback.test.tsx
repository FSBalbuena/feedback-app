import { useCreateFeedback, makePrompt } from "../useCreateFeedback";
import { waitFor, renderHook } from "@testing-library/react";
import { Intentions } from "@/types/common";
import { steps } from "@/data/steps";
import { apiClient } from "@/configs/apiClient";
import { createWrapper } from "./createWrapper";

const intentions: Intentions = {
  [steps[0].id]: "Some example answer",
};

const mockedAxiosData = "Mocked data";

jest.mock("@/configs/apiClient");

const mockedAxios = apiClient as jest.Mocked<typeof apiClient>;
const prompt = makePrompt(intentions);

describe("useCreateFeedback", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it("should call the mutation and return the correct data", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { feedback: mockedAxiosData },
    });

    const { result } = renderHook(() => useCreateFeedback(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(intentions);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockedAxiosData);

    expect(mockedAxios.post).toHaveBeenCalledWith("/feedback", { prompt });
  });

  it("should handle mutation errors", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Failed to add todo"));

    const { result } = renderHook(() => useCreateFeedback(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(intentions);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error("Failed to add todo"));
  });
});
