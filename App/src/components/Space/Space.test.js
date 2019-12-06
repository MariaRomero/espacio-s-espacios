import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import Space from "./Space";
import renderer from "react-test-renderer";

const spaceObj = {
  id: "1234",
  address: "abc road",
  postcode: "bn12nb",
  noBeds: 2,
  description: "lovely house with garden",
  price: 230,
  images: "someUrls",
  expires: "Sat Nov 30 2019 19:26:33"
};

test("renders Space component with listed space correctly", () => {
  const component = renderer.create(<Space space={spaceObj} />).toJSON();
  expect(component).toMatchSnapshot();
});

test("onclick updateForm", () => {
  const updateForm = jest.fn();
  const { getByText } = render(
    <Space updateForm={updateForm} space={spaceObj} />
  );
  fireEvent.click(getByText("Update Space"));
  expect(updateForm).toHaveBeenCalled();
});

test("onclick removeSpace", () => {
  const removeSpace = jest.fn();
  const { getByText } = render(
    <Space removeSpace={removeSpace} space={spaceObj} />
  );
  fireEvent.click(getByText("Remove Space"));
  expect(removeSpace).toHaveBeenCalled();
});
