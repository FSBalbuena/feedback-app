import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import { createWrapper } from "@/querys/queryTests/createWrapper";
import {
  Feedback,
  FeedbackSkeleton,
  GatherInformation,
  Home,
} from "@/data/copy";
import { clickOnButton } from "@/views/GatherInformation/GatherInformation.test";
import { useCreateFeedback } from "@/querys";

jest.mock("@/querys/useCreateFeedback");

const mockedHook = useCreateFeedback as jest.MockedFunction<
  typeof useCreateFeedback
>;

const Wrapper = createWrapper();
const ApiMockData = "Mock Data";

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("On Render", () => {
    it("should render", () => {
      // @ts-expect-error mock
      mockedHook.mockReturnValue({
        mutate: jest.fn(),
        isPending: false,
        data: null,
      });
      const { container } = render(
        <Wrapper>
          <App />
        </Wrapper>
      );
      expect(container).toMatchSnapshot();
    });
  });
  describe("when user starts the app", () => {
    it("should show GatherInformation Component", () => {
      // @ts-expect-error mock
      mockedHook.mockReturnValue({
        mutate: () => {},
        isPending: false,
        data: null,
        reset: () => {},
      });
      render(
        <Wrapper>
          <App />
        </Wrapper>
      );
      clickOnButton(Home.START_BUTTON);

      waitFor(() => {
        const nextButton = screen.getByRole("button", {
          name: GatherInformation.NEXT_BUTTON,
        });
        expect(nextButton).toBeInTheDocument();
      });
    });
  });
  describe("when user asks for advice", () => {
    it("should show Loading State", () => {
      // @ts-expect-error mock
      mockedHook.mockReturnValue({
        mutate: jest.fn(),
        isPending: true,
        data: null,
        reset: jest.fn(),
      });

      render(
        <Wrapper>
          <App />
        </Wrapper>
      );
      clickOnButton(Home.START_BUTTON);
      waitFor(() => {
        expect(
          screen.getByText(FeedbackSkeleton.LOADING_MESSAGE)
        ).toBeInTheDocument();
      });
    });
    it("should show correct Data", () => {
      // @ts-expect-error mock
      mockedHook.mockReturnValue({
        mutate: jest.fn(),
        isPending: false,
        data: ApiMockData,
        reset: jest.fn(),
      });
      render(
        <Wrapper>
          <App />
        </Wrapper>
      );
      clickOnButton(Home.START_BUTTON);
      waitFor(() => {
        expect(screen.getByText(ApiMockData)).toBeInTheDocument();
      });
    });
    it("should reset Data", () => {
      const returnedValues = {
        mutate: jest.fn(),
        isPending: false,
        data: ApiMockData,
        reset: () => {
          // @ts-expect-error mock
          if (this?.data) this.data = null;
        },
      };
      // @ts-expect-error mock
      mockedHook.mockReturnValue(returnedValues);
      render(
        <Wrapper>
          <App />
        </Wrapper>
      );
      clickOnButton(Home.START_BUTTON);

      waitFor(() => {
        expect(screen.getByText(ApiMockData)).toBeInTheDocument();
      });
      clickOnButton(Feedback.RESTART_BUTTON);
      waitFor(() => {
        const textbox = screen.getByRole("textbox", {
          name: GatherInformation.TEXT_FIELD_LABEL,
        });
        expect(textbox).toBeInTheDocument();
      });
    });
  });
});
