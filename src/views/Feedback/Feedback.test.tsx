import Feedback from ".";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Feedback as copyText } from "@/data/copy";

const feedbackAdvice = `# Feedback Advice \n
testing markdown with *snapshot testing*\n
1. test ordered list\n
1.1 test ordered list 2\n
and some tips:\n
* tip 1
* tip 2`;

const onRestart = jest.fn();

const DEFAULT_PROPS = {
  feedbackAdvice,
  onRestart,
};

describe("Feedback", () => {
  describe("on Render", () => {
    it("should render", () => {
      const { container } = render(<Feedback {...DEFAULT_PROPS} />);
      expect(container).toMatchSnapshot();
    });
  });
  describe("interactive", () => {
    describe("when user clicks on restart", () => {
      it("should call onRestart", () => {
        render(<Feedback {...DEFAULT_PROPS} />);
        const button = screen.getByRole("button", {
          name: copyText.RESTART_BUTTON,
        });
        expect(button).toBeInTheDocument();
        expect(onRestart).not.toHaveBeenCalled();

        fireEvent.click(button as Element);
        expect(onRestart).toHaveBeenCalled();
      });
    });

    describe("when user clicks on copy", () => {
      it("should fired an alert", () => {
        render(<Feedback {...DEFAULT_PROPS} />);
        const button = screen.getByRole("button", {
          name: copyText.COPY_BUTTON,
        });
        expect(button).toBeInTheDocument();
        const alert = screen.queryByRole("alert");
        expect(alert).toBeNull();

        fireEvent.click(button as Element);
        waitFor(() => {
          const alert = screen.queryByRole("alert");
          expect(alert).toBeInTheDocument();
          expect(alert).toHaveTextContent(copyText.COPY_ALERT);
        });
      });
    });
  });
  describe("behavior", () => {
    describe("when there is an error on copy", () => {
      beforeAll(() => {
        Object.assign(navigator, {
          clipboard: {
            writeText: jest.fn().mockImplementation(() => {
              throw new Error("Clipboard write failed");
            }),
          },
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });
      it("should not fired an alert", () => {
        render(<Feedback {...DEFAULT_PROPS} />);
        const button = screen.getByRole("button", {
          name: copyText.COPY_BUTTON,
        });
        expect(button).toBeInTheDocument();
        const alert = screen.queryByRole("alert");
        expect(alert).toBeNull();

        fireEvent.click(button as Element);
        waitFor(() => {
          const alert = screen.queryByRole("alert");
          expect(alert).toBeNull();
        });
      });
    });
  });
});
