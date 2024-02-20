import React from "react";
import PostList from "./PostList";
import { BlogPost } from "./types";
import { useQuery } from "@tanstack/react-query";

export default function PostListPage() {
  const result = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:7000/posts?short=1200");
      const data: BlogPost[] = await response.json();
      return data;
    }
  });

  // const [posts, setPosts] = React.useState<BlogPost[] | null>(null);

  // React.useEffect(() => {
  //   fetch("http://localhost:7000/posts?short")
  //     .then(response => response.json())
  //     .then(json => {
  //       setPosts(json);
  //     })
  //     .catch(err => console.error("Loading data failed: " + err));
  // }, []);

  if (result.isLoading) {
    return <h1>Loading, please wait...</h1>;
  }

  if (result.isError) {
    return <h1>Fehler</h1>;
  }

  if (result.isSuccess) {
    return <PostList posts={result.data} />;
  }

  throw new Error("Invalid State");
}
