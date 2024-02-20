import React from "react";
import moment from "moment";
import { BlogPost } from "./types";
import { useLikeMutation } from "./use-like-mutation";
function formattedDate(date: string) {
  return moment(date).format("DD.MM.YYYY");
}

type PostProps = {
  post: BlogPost;
};

export default function Post({ post }: PostProps) {
  const likeMutation = useLikeMutation(post.id);

  return (
    <article className="Container">
      <p className="Date">{formattedDate(post.date)}</p>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Likes: {post.likes}</p>
      <button
        onClick={() => {
          likeMutation.mutate();
        }}
      >
        Like!
      </button>
    </article>
  );
}
