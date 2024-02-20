import { useGetBlogPostQuery } from "./use-get-blog-post";

// function CurrentUserProvider({children }) {

//   const queryResult = useGetBlogPostQuery("P10");

//   if (queryResult.isSuccess) {
//     return <CurrentUserProvider.Provider value={{ currentUser: queryResult.data }}
//       {children}
//     </CurrentUserProvider.Provider>
//   }

//     return ...;

// }

export default function Sidebar() {
  const queryResult = useGetBlogPostQuery("P10");

  return (
    <div className="Sidebar">
      {queryResult.data ? (
        <p>
          {queryResult.data.title} Likes: {queryResult.data.likes}
        </p>
      ) : (
        "..."
      )}
    </div>
  );
}
