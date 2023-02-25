import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function formattedDate(date: string) {
  return moment(date).format("DD.MM.YYYY");
}
type PostTeaser = {
  id: string;
  date: string;
  title: string;
  teaser?: string | null;
};
type PostListProps = {
  posts: PostTeaser[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      <Link className="Button" to="/add">
        Add Post
      </Link>
      {posts.map(p => (
        <Link key={p.id} to={`/post/${p.id}`}>
          <article className="Container">
            <p className="Date">{formattedDate(p.date)}</p>
            <h2>{p.title}</h2>
            <p>{p.teaser}</p>
          </article>
        </Link>
      ))}
    </>
  );
}