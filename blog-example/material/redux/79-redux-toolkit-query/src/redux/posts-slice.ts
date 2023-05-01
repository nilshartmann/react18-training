import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BlogPost, NewBlogPost } from "../types";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000" }),
  tagTypes: ["BlogPost"],
  endpoints: builder => ({
    loadPosts: builder.query<BlogPost[], void>({
      query: () => "/posts?slow",
      providesTags: ["BlogPost"]
    }),
    getPost: builder.query<BlogPost, string>({
      query: postId => `/posts/${postId}/?slow`,
      providesTags: (_result, _error, postId) => {
        return [{ type: "BlogPost", id: postId }];
      }
    }),
    savePost: builder.mutation<BlogPost, NewBlogPost>({
      query: newPost => ({
        url: `posts?slow`,
        method: "POST",
        body: newPost
      }),
      invalidatesTags: ["BlogPost"]
    })
  })
});

export const { useLoadPostsQuery, useGetPostQuery, useSavePostMutation } = postsApi;
