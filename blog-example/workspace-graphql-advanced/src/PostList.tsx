import React from "react";
import { Link } from "react-router-dom";

type IPostTeaser = {
  id: string;
  formattedDate: string;
  title: string;
  teaser?: string | null;
};
type PostListProps = {
  posts: IPostTeaser[];
};

export default function PostList({ posts }: PostListProps) {
  // todo:
  //  - jedes dargestellte Post soll einen Button bekommen,
  //    mit dem er als Bookmark hinzugefügt werden kann
  //  - du kannst die Logik hier oder in PostTeaser implementieren
  //    - wo findest Du es besser?
  //
  //  optional:
  //  - wenn der Blogpost bereits in der Liste der Bookmarks ist,
  //     zeige das an (z.B. disable den Hinzufügen-Button)
  //  - kannst du die Komponente(n) so bauen, dass nur die gerendert
  //     werden, die als Bookmark hinzugefügt oder entfernt wurden?

  return (
    <>
      <Link className="Button" to="/add">
        Add Post
      </Link>
      {posts.map(p => (
        <PostTeaser key={p.id} post={p} />
      ))}
    </>
  );
}

type PostTeaserProps = {
  post: IPostTeaser;
};
function PostTeaser({ post }: PostTeaserProps) {
  return (
    <article key={post.id} className="Container">
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p className="Date">{post.formattedDate}</p>

      <p>{post.teaser}</p>
    </article>
  );
}
