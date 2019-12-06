import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";
import Spaces from "./Spaces";
import renderer from "react-test-renderer";

it("renders Spaces created correctly", () => {
  const component = renderer.create(<Spaces />).toJSON();
  expect(component).toMatchSnapshot();
});

test("renders loading when spaces is undefined", () => {
  const testData = "Loading...";
  const { getByText } = render(<Spaces />);

  expect(getByText(testData)).toBeInTheDocument();
});

test("renders components and displays text", () => {
  const spaceObj = [
    {
      id: "1234",
      address: "abc road",
      postcode: "bn12nb",
      noBeds: 2,
      description: "lovely house with garden",
      price: 230,
      images: "someUrls",
      expires: new Date()
    }
  ];

  const component = renderer
    .create(<Spaces key={spaceObj.id} space={spaceObj} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
