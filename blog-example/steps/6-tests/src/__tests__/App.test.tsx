import { enableFetchMocks } from "jest-fetch-mock";
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const mockPosts = [
  { id: "1", title: "One Fetch Mock", body: "Lorem ipsum" },
  { id: "2", title: "Second Post Fetch Mock", body: "Some more content" }
];

afterEach(() => {
  jest.restoreAllMocks();
});

it("should render posts read from backend", async () => {
  enableFetchMocks();

  fetchMock.mockResponseOnce(JSON.stringify(mockPosts));
  render(<App />);

  expect(screen.getByRole("alert")).toBeInTheDocument();

  const articleOne = await screen.findByRole("heading", { name: "One Fetch Mock" });
  expect(articleOne).toBeInTheDocument();
  expect(screen.getByText("Second Post Fetch Mock")).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: /add/i }));

  const postEditor = getPostEditorModel();
  postEditor.fillTitle("Hello World");
  postEditor.fillBody("Lorem ipsum");

  // mock save response
  const mockResponse = {
    title: "Hello World",
    body: "Lorem ipsum",
    id: "P9999999"
  };
  fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

  postEditor.clickSave();

  expect(fetchMock).toHaveBeenCalledTimes(2);

  // Verify correct body has been SENT to the server
  expect(fetchMock.mock.calls[1][1]?.body).toEqual(
    JSON.stringify({ title: "Hello World", body: "Lorem ipsum" })
  );

  // we should be back on the front page with post list again,
  // new blog post should be visible
  await screen.findByRole("heading", {
    name: /Hello World/i
  });
});

function getPostEditorModel() {
  expect(screen.getByRole("heading", { name: /create post/i })).toBeInTheDocument();

  return {
    saveButton: screen.getByRole("button", { name: "Save Post" }),
    titleInput: screen.getByLabelText("Title"),
    bodyInput: screen.getByLabelText("Body"),

    fillTitle(newTitle: string) {
      userEvent.type(this.titleInput, newTitle);
    },
    fillBody(newBody: string) {
      userEvent.type(this.bodyInput, newBody);
    },
    clickSave() {
      userEvent.click(this.saveButton);
    }
  };
}
