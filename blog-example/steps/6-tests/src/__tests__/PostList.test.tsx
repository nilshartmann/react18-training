import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PostList from "../PostList";

const mockPosts = [
  { id: "1", title: "One", body: "Lorem ipsum", date: "2019-08-23T18:25:43.511Z" },
  { id: "2", title: "Second Post", body: "Some more content", date: "2019-09-22T14:12:21.511Z" }
];

it("renders correctly", () => {
  const result = render(<PostList posts={mockPosts} onAddPost={jest.fn()} />);
  expect(result.asFragment()).toMatchSnapshot();
});

it("invokes callback on button click", () => {
  const onAddPostFn = jest.fn();

  // Render
  render(<PostList onAddPost={onAddPostFn} posts={mockPosts} />);

  // search the button
  const buttonElement = screen.getByRole("button", { name: "Add Post" });
  userEvent.click(buttonElement);

  // make sure it has been invoked
  expect(onAddPostFn).toHaveBeenCalled();
});
