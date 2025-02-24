import Home from "./index";
import { fireEvent, render, screen } from "@testing-library/react";
import { Home as copyText } from "../../data/copy";

const onStart = jest.fn();
const DEFAULT_PROPS = {
  onStart,
};
describe("Home", () => {
  describe("on Render", () => {
    it("should render the correct Title", () => {
      render(<Home {...DEFAULT_PROPS} />);
      const title = screen.getByRole("heading");
      expect(title).toHaveTextContent(copyText.TITLE);
    });
    it("should render a description", () => {
      render(<Home {...DEFAULT_PROPS} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
    it("should render a description", () => {
      render(<Home {...DEFAULT_PROPS} />);
      const description = screen.getByRole("paragraph");
      expect(description).toBeInTheDocument();
    });

    describe("when is mobile width", () => {
      let realInnerWidth: number;
      beforeAll(() => {
        realInnerWidth = window.innerWidth;
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: 400,
        });
      });
      afterAll(() => {
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: realInnerWidth,
        });
      });
      it("should not render a description", () => {
        render(<Home {...DEFAULT_PROPS} />);
        const description = screen.queryByRole("paragraph");
        expect(description).toBeNull();
      });
    });
  });
  describe("Interactive", () => {
    describe("When start button is clicked", () => {
      it("Should call onStart func", () => {
        render(<Home {...DEFAULT_PROPS} />);
        expect(onStart).not.toHaveBeenCalled();
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        fireEvent.click(button as Element);
        expect(onStart).toHaveBeenCalled();
      });
    });
  });
});
