import { BlogPost, BlogPostTeaser, NewBlogPost } from "./types";

const ADD_SLOW = true;

export async function loadBlogPosts(): Promise<BlogPostTeaser[]> {
  const response = await fetch(backendUrl("?short"));
  if (!response.ok) {
    throw new Error("Could not load blog posts: " + response.status);
  }

  const json = response.json();

  return json;
}

export async function loadBlogPost(postId: string): Promise<BlogPost> {
  const response = await fetch(backendUrl(postId));
  if (!response.ok) {
    throw new Error("Could not load blog post: " + response.status);
  }

  const json = response.json();

  return json;
}

export async function savePost(post: NewBlogPost): Promise<boolean> {
  const response = await fetch(backendUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    throw new Error("Could not save blog post: " + response.status);
  }

  return true;
}

function backendUrl(path: string = "") {
  const url = `http://localhost:7000/posts/${path}`;

  if (!ADD_SLOW) {
    return url;
  }

  if (url.indexOf("?") >= 0) {
    return `${url}&slow`;
  }
  return url + "?slow";
}
