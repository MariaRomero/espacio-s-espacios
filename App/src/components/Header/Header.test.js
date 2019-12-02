import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import renderer from "react-test-renderer";

it("renders Header component correctly", () => {
  const component = renderer.create(<Header />).toJSON();
  expect(component.children[0].children[0]).toEqual("Spaces");
  expect(component).toMatchSnapshot();
});
