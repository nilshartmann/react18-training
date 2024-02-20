import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { BlogPost } from "./types";

// export function useGetUserPermission(userId: string, permission: string) {
//   return useQuery({
//     queryKey: ["user", userId, "permissions", permission, ],
//     queryFn: async () => {
//       const response = await fetch(`http://localhost:7000/posts/${postId}?slow`);
//       const data = await response.json();

//       return data as BlogPost;
//     }
//   });
// }

export function useGetBlogPostQuery(postId: string) {
  return useSuspenseQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/posts/${postId}?slow=2500`);
      const data = await response.json();

      return data as BlogPost;
    }
  });
}

// declare function json(): unknown;
// const data = json();
// if (isValidBlogPost(data)) {
//   data.title.toUpperCase();
// }

// // Type Predicate Function
// function isValidBlogPost(data: any): data is BlogPost {
//   return true;
// }

// // Type Assertion Function
// function assertValidBlogPost(data: any): asserts data is BlogPost {
//   // ...
//   if (!data) {
//     throw new Error("data is not a BlogPost");
//   }
// }

// function validateBlogPostData(data: any): BlogPost {
//   if (!data) {
//     // ...
//   }

//   if (typeof data === "object") {
//     //
//   }

//   return data as BlogPost;
// }
