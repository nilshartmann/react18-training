import moment from "moment";
import { BlogPostTeaser } from "./types";
import { Link } from "react-router-dom";

function formattedDate(date: string) {
  return moment(date).format("DD.MM.YYYY");
}

type PostListProps = {
  posts: BlogPostTeaser[];
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
            <h1>{p.title}</h1>
          </article>
        </Link>
      ))}
    </>
  );
}
