import { MockedResponse, MockedProvider } from "@apollo/client/testing";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { GraphQLError } from "graphql";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PostPageDocument, PostPageQuery } from "../generated/graphql";
import PostPage from "../PostPage";

test("PostPage", async () => {
  // todo: Vervollständige das Mock-Objekt, so dass der Test "grün" wird
  //
  //

  const postPageMock: MockedResponse = {
    request: {
      query: PostPageDocument
    },
    result: {}
  };

  render(
    <MemoryRouter initialEntries={["/post/P1"]}>
      <MockedProvider mocks={[postPageMock]}>
        <Routes>
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </MockedProvider>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByRole("heading", { name: /loading/i }));
  expect(await screen.findByRole("heading", { name: /hello world/i })).toBeInTheDocument();
  expect(await screen.findByText("Lorem ipsum dolor sit")).toBeInTheDocument();
});

test("error works", async () => {
  // todo:
  //   Vervollständige das Mock-Objekt,
  //   so dass es einen Fehler zurücklieft ('errors' statt 'data')
  //   und der Test dann "grün" wird
  const postPageMockErr: MockedResponse = {
    request: {
      query: PostPageDocument
    },
    result: {}
  };

  render(
    <MemoryRouter initialEntries={["/post/P2"]}>
      <MockedProvider mocks={[postPageMockErr]}>
        <Routes>
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </MockedProvider>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByRole("heading", { name: /loading/i }));
  expect(await screen.findByText(/au weia/i)).toBeInTheDocument();
});
