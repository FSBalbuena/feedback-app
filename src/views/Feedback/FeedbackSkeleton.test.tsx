import FeedbackSkeleton from "./FeedbackSkeleton";
import { render } from "@testing-library/react";

describe("FeedbackSkeleton", () => {
  describe("on Render", () => {
    it("should render", () => {
      const { container } = render(<FeedbackSkeleton />);
      expect(container).toMatchSnapshot();
    });
  });
});
