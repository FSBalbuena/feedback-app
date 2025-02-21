import Home from "./index";
import { render } from "@testing-library/react";

describe("Home", () => {
  it("should render", () => {
    const { container } = render(<Home onStart={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});
