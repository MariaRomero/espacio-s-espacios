import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form";
import renderer from "react-test-renderer";

it("renders Form component correctly", () => {
  const component = renderer.create(<Form />).toJSON();
  expect(component).toMatchSnapshot();
});
