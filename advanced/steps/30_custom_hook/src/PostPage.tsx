import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { BlogPost } from "./types";
import { useQuery } from "@tanstack/react-query";

function useGetBlogPost(postId: string) {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/posts/${postId}?slow`);
      if (!response.ok) {
        throw new Error("Response was not ok!");
      }
      return response.json() as Promise<BlogPost>;
    }
  });
}

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }

  const { data, isError, isLoading } = useGetBlogPost(postId);

  if (isError) {
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
    </>
  );
}
