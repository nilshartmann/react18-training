import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BlogPost, NewBlogPost } from "../types";

export const postsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000" }),
  endpoints: builder => ({})
});
