import { useMutation } from "@tanstack/react-query";

export function useLikeMutation(postId: string) {
  return useMutation({
    mutationKey: ["posts", postId],
    mutationFn: () => {
      return fetch(`http://localhost:7000/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  });
}
