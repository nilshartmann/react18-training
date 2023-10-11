import { formattedDate } from "./format-date";
import { BlogPost } from "./types";

type PostListProps = {
  posts: BlogPost[];
  onAddPost(): void;
};

export default function PostList({ posts, onAddPost }: PostListProps) {
  return (
    <>
      <button onClick={onAddPost}>Add Post</button>
      {posts.map(p => (
        <article key={p.id} className="Container">
          <p className="Date">{formattedDate(p.date)}</p>
          <h1>{p.title}</h1>
          <p>{p.body}</p>
        </article>
      ))}
    </>
  );
}
