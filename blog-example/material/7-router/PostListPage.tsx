import React from "react";
import PostList from "./PostList";
import { BlogPost } from "./types";
import LoadingIndicator from "./LoadingIndicator";

type FetchState = {
  posts?: BlogPost[];
  loading?: boolean;
  error?: string;
};

export default function PostListPage() {
  const [fetchState, setFetchState] = React.useState<FetchState>({});

  React.useEffect(() => {
    setFetchState({ loading: true });
    fetch("http://localhost:7000/posts?slow")
      .then(response => response.json())
      .then(json => {
        setFetchState({ posts: json });
      })
      .catch(err => {
        setFetchState({ error: String(err) });
      });
  }, []);

  if (fetchState.loading) {
    return <LoadingIndicator>Server Request running. Please wait.</LoadingIndicator>;
  }

  return <PostList posts={fetchState.posts || []} />;
}
