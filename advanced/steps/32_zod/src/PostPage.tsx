import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  date: z.string()
});

type BlogPost = z.infer<typeof BlogPostSchema>;

function useGetBlogPost(postId: string) {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/posts/${postId}`);
      if (!response.ok) {
        throw new Error("Response was not ok!");
      }
      const result = await response.json(); // result is any!
      const blogPost = BlogPostSchema.parse(result); // blogPost is BlogPost!
      return blogPost;
    }
  });
}

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }

  // Achtung!: Im Fehlerfall wird dieser Query x-mal ausgeführt!
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
    </>
  );
}
