// __tests__/snapshot.js

import {render} from "@testing-library/react";
import Index from "../pages/index";

it("renders homepage unchanged", () => {
  const {container} = render(<Index />);
  expect(container).toMatchSnapshot();
});
