import PostList from "./PostList";
import LoadingIndicator from "./LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import { loadBlogPosts } from "./blog-api";

export default function PostListPage() {
  const {
    data: posts,
    error,
    isLoading,
    isError
  } = useQuery({ queryKey: ["posts"], queryFn: loadBlogPosts });

  if (isLoading) {
    // Initial loading, no data is in the cache yet
    return <LoadingIndicator>Server Request running. Please wait.</LoadingIndicator>;
  }

  if (isError) {
    console.error(error);
    return <h1>Loading failed</h1>;
  }

  return <PostList posts={posts || []} />;
}
