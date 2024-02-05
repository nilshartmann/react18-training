import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useGetBlogPost } from "./get-post";
import { useGetUser, usePreloadUser } from "./use-user-query";
import { Suspense } from "react";

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }

  // Achtung!: Im Fehlerfall wird dieser Query x-mal ausgeführt!
  usePreloadUser(postId);
  const { data, isError, error, isLoading } = useGetBlogPost(postId);

  if (isError) {
    console.error("Could not load blog post", error);
    return <h1>Error :-(</h1>;
  }

  if (isLoading || !data) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link className="Button" to="/">
        Home
      </Link>
      <Post post={data} />
      <Suspense fallback={<b>Loading user...</b>}>
        <UserDetails postId={postId} />
      </Suspense>
    </>
  );
}

type UserDetailsProps = {
  postId: string;
};
function UserDetails({ postId }: UserDetailsProps) {
  const { data: user } = useGetUser(postId);
  return <p>Written by: {user.username}</p>;
}
