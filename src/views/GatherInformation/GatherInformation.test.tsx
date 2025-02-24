import GatherInformation from ".";
import { GatherInformation as copyText } from "../../data/copy";
import { steps } from "../../data/steps";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const writeAnswer = (answer: string) => {
  const textArea = screen.getByRole("textbox", {
    name: copyText.TEXT_FIELD_LABEL,
  });
  expect(textArea).toBeInTheDocument();
  fireEvent.change(textArea as Element, {
    target: { value: answer },
  });
  waitFor(() => {
    expect(textArea).toHaveValue(answer);
  });
};

const clickOnButton = (buttonIdentifier: string) => {
  const button = screen.getByRole("button", { name: buttonIdentifier });
  expect(button).toBeInTheDocument();
  fireEvent.click(button as Element);
};

const completeOneQuestion = (answer: string) => {
  writeAnswer(answer);
  clickOnButton(copyText.NEXT_BUTTON);
};

const moveToLastQuestion = () => {
  steps.forEach((step, index) => {
    if (index === steps.length - 1) return;
    completeOneQuestion(step.id);
    waitFor(() => {
      const textArea = screen.getByRole("textbox", {
        name: copyText.TEXT_FIELD_LABEL,
      });
      expect(textArea).toHaveValue("");
    });
  });
};

const onGetFeedback = jest.fn();
const DEFAULT_PROPS = { onGetFeedback };
describe("GatherInformation", () => {
  describe("on Render", () => {
    it("should render", () => {
      const { container } = render(<GatherInformation {...DEFAULT_PROPS} />);
      expect(container).toMatchSnapshot();
    });
  });
  describe("behavior", () => {
    describe("when user is in the first Step", () => {
      it("should show prev button as disabled", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        const button = screen.getByRole("button", {
          name: copyText.PREV_BUTTON,
        });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
      });
    });
    describe("when user has not written an answer", () => {
      it("should show next button as disabled", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        const textArea = screen.getByRole("textbox", {
          name: copyText.TEXT_FIELD_LABEL,
        });
        expect(textArea).toBeInTheDocument();
        const button = screen.getByRole("button", {
          name: copyText.NEXT_BUTTON,
        });
        expect(button).toBeInTheDocument();
        expect(textArea).toHaveValue("");
        expect(button).toBeDisabled();
      });
    });
    describe("when user is not in the first Step", () => {
      it("should show prev button as enabled", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        const firstAnswer = "first answer";
        writeAnswer(firstAnswer);
        clickOnButton(copyText.NEXT_BUTTON);
        const button = screen.getByRole("button", {
          name: copyText.PREV_BUTTON,
        });
        waitFor(() => {
          expect(button).toBeInTheDocument();
          expect(button).not.toBeDisabled();
        });
      });
    });
    describe("when user is in the last Step", () => {
      it("should not show next button", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        moveToLastQuestion();
        const button = screen.queryByRole("button", {
          name: copyText.NEXT_BUTTON,
        });
        expect(button).toBeNull();
      });
      it("should show get feedback button  as disabled", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        moveToLastQuestion();
        const button = screen.getByRole("button", {
          name: copyText.GET_FEEDBACK_BUTTON,
        });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
      });
      describe("when user has written an answer", () => {
        it("should show get feedback button enabled", () => {
          render(<GatherInformation {...DEFAULT_PROPS} />);
          moveToLastQuestion();
          writeAnswer("test answer");
          const button = screen.getByRole("button", {
            name: copyText.GET_FEEDBACK_BUTTON,
          });
          expect(button).not.toBeDisabled();
        });
      });
    });
  });

  describe("Interactive", () => {
    describe("when user types on text field", () => {
      it("should update answer", () => {
        const testAnswer = "Test Answer";
        render(<GatherInformation {...DEFAULT_PROPS} />);
        writeAnswer(testAnswer);
      });
    });
    describe("when user clicks on next button", () => {
      it("should update the title", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        const title = screen.getByRole("heading");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent(steps[0].question);
        writeAnswer("something");
        clickOnButton(copyText.NEXT_BUTTON);
        waitFor(() => {
          expect(title).toHaveTextContent(steps[1].question);
        });
      });
      it("should update the description", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        const description = screen.getByRole("paragraph");
        expect(description).toBeInTheDocument();
        expect(description).toHaveTextContent(steps[0].hint);
        writeAnswer("something");
        clickOnButton(copyText.NEXT_BUTTON);
        waitFor(() => {
          expect(description).toHaveTextContent(steps[1].hint);
        });
      });
      it("should update the answer", () => {
        const testAnswer = "Test Answer";
        render(<GatherInformation {...DEFAULT_PROPS} />);
        writeAnswer(testAnswer);
        clickOnButton(copyText.NEXT_BUTTON);
        waitFor(() => {
          const textArea = screen.getByRole("textbox", {
            name: copyText.TEXT_FIELD_LABEL,
          });
          expect(textArea).toHaveValue("");
        });
      });
    });
    describe("when user clicks on prev field", () => {
      it("should update the title", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        const title = screen.getByRole("heading");
        expect(title).toHaveTextContent(steps[0].question);
        completeOneQuestion("complete first");
        waitFor(() => {
          expect(title).toHaveTextContent(steps[1].question);
        });

        clickOnButton(copyText.PREV_BUTTON);
        waitFor(() => {
          expect(title).toHaveTextContent(steps[0].question);
        });
      });
      it("should update the description", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        const description = screen.getByRole("paragraph");
        expect(description).toHaveTextContent(steps[0].hint);
        completeOneQuestion("complete first");
        waitFor(() => {
          expect(description).toHaveTextContent(steps[1].hint);
        });
        clickOnButton(copyText.PREV_BUTTON);
        waitFor(() => {
          expect(description).toHaveTextContent(steps[0].hint);
        });
      });
      it("should update with the previous answer", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        const firstAnswer = "complete first";
        const textArea = screen.getByRole("textbox", {
          name: copyText.TEXT_FIELD_LABEL,
        });
        completeOneQuestion(firstAnswer);
        waitFor(() => {
          expect(textArea).toHaveValue("");
        });
        clickOnButton(copyText.PREV_BUTTON);
        waitFor(() => {
          expect(textArea).toHaveValue(firstAnswer);
        });
      });
    });
    describe("when user clicks on get Feedback", () => {
      it("should call service", () => {
        render(<GatherInformation {...DEFAULT_PROPS} />);
        moveToLastQuestion();
        writeAnswer(steps[steps.length - 1].id);
        expect(onGetFeedback).not.toHaveBeenCalled();
        clickOnButton(copyText.GET_FEEDBACK_BUTTON);
        expect(onGetFeedback).toHaveBeenCalled();
      });
    });
  });
});
