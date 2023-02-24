import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BlogPost = {
  __typename?: "BlogPost";
  body: Scalars["String"];
  date: Scalars["String"];
  id: Scalars["ID"];
  likes: Scalars["Int"];
  teaser?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  user: User;
};

export type BlogPostTeaserArgs = {
  maxLength?: InputMaybe<Scalars["Int"]>;
};

export type CreateBlogPostResult = {
  __typename?: "CreateBlogPostResult";
  blogPost?: Maybe<BlogPost>;
  error?: Maybe<Scalars["String"]>;
};

export type LikePostResult = {
  __typename?: "LikePostResult";
  blogPost?: Maybe<BlogPost>;
  error?: Maybe<Scalars["String"]>;
};

export type LoginResult = {
  __typename?: "LoginResult";
  error?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  createBlogPost: CreateBlogPostResult;
  likePost: LikePostResult;
  login: LoginResult;
};

export type MutationCreateBlogPostArgs = {
  postData: NewBlogPost;
};

export type MutationLikePostArgs = {
  postId: Scalars["ID"];
};

export type MutationLoginArgs = {
  login: Scalars["String"];
  password: Scalars["String"];
};

export type NewBlogPost = {
  body: Scalars["String"];
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  ping: Scalars["String"];
  post?: Maybe<BlogPost>;
  posts: Array<BlogPost>;
  users: Array<User>;
};

export type QueryPingArgs = {
  msg?: InputMaybe<Scalars["String"]>;
};

export type QueryPostArgs = {
  postId: Scalars["ID"];
};

export type Subscription = {
  __typename?: "Subscription";
  onNewLike: BlogPost;
};

export type SubscriptionOnNewLikeArgs = {
  postId?: InputMaybe<Scalars["ID"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  login: Scalars["String"];
  name: Scalars["String"];
};

export type AddBlogPostMutationVariables = Exact<{
  postData: NewBlogPost;
}>;

export type AddBlogPostMutation = {
  __typename?: "Mutation";
  newPost: {
    __typename?: "CreateBlogPostResult";
    error?: string | null;
    blogPost?: {
      __typename?: "BlogPost";
      id: string;
      title: string;
      date: string;
      body: string;
      user: { __typename?: "User"; id: string; name: string };
    } | null;
  };
};

export type LikePostMutationVariables = Exact<{
  postId: Scalars["ID"];
}>;

export type LikePostMutation = {
  __typename?: "Mutation";
  likePost: {
    __typename?: "LikePostResult";
    blogPost?: { __typename?: "BlogPost"; id: string; likes: number } | null;
  };
};

export type PostListPageQueryVariables = Exact<{ [key: string]: never }>;

export type PostListPageQuery = {
  __typename?: "Query";
  posts: Array<{
    __typename?: "BlogPost";
    date: string;
    title: string;
    teaser?: string | null;
    id: string;
  }>;
};

export type PostPageQueryVariables = Exact<{
  postId: Scalars["ID"];
}>;

export type PostPageQuery = {
  __typename?: "Query";
  post?: {
    __typename?: "BlogPost";
    id: string;
    title: string;
    date: string;
    body: string;
    likes: number;
  } | null;
};

export const AddBlogPostDocument = gql`
  mutation AddBlogPost($postData: NewBlogPost!) {
    newPost: createBlogPost(postData: $postData) {
      error
      blogPost {
        id
        title
        date
        body
        user {
          id
          name
        }
      }
    }
  }
`;
export type AddBlogPostMutationFn = Apollo.MutationFunction<
  AddBlogPostMutation,
  AddBlogPostMutationVariables
>;

/**
 * __useAddBlogPostMutation__
 *
 * To run a mutation, you first call `useAddBlogPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBlogPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBlogPostMutation, { data, loading, error }] = useAddBlogPostMutation({
 *   variables: {
 *      postData: // value for 'postData'
 *   },
 * });
 */
export function useAddBlogPostMutation(
  baseOptions?: Apollo.MutationHookOptions<AddBlogPostMutation, AddBlogPostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddBlogPostMutation, AddBlogPostMutationVariables>(
    AddBlogPostDocument,
    options
  );
}
export type AddBlogPostMutationHookResult = ReturnType<typeof useAddBlogPostMutation>;
export type AddBlogPostMutationResult = Apollo.MutationResult<AddBlogPostMutation>;
export type AddBlogPostMutationOptions = Apollo.BaseMutationOptions<
  AddBlogPostMutation,
  AddBlogPostMutationVariables
>;
export const LikePostDocument = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      blogPost {
        id
        likes
      }
    }
  }
`;
export type LikePostMutationFn = Apollo.MutationFunction<
  LikePostMutation,
  LikePostMutationVariables
>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(
  baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
}
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<
  LikePostMutation,
  LikePostMutationVariables
>;
export const PostListPageDocument = gql`
  query PostListPage {
    posts {
      date
      title
      teaser(maxLength: 20)
      id
    }
  }
`;

/**
 * __usePostListPageQuery__
 *
 * To run a query within a React component, call `usePostListPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostListPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostListPageQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostListPageQuery(
  baseOptions?: Apollo.QueryHookOptions<PostListPageQuery, PostListPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostListPageQuery, PostListPageQueryVariables>(
    PostListPageDocument,
    options
  );
}
export function usePostListPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostListPageQuery, PostListPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostListPageQuery, PostListPageQueryVariables>(
    PostListPageDocument,
    options
  );
}
export type PostListPageQueryHookResult = ReturnType<typeof usePostListPageQuery>;
export type PostListPageLazyQueryHookResult = ReturnType<typeof usePostListPageLazyQuery>;
export type PostListPageQueryResult = Apollo.QueryResult<
  PostListPageQuery,
  PostListPageQueryVariables
>;
export const PostPageDocument = gql`
  query PostPage($postId: ID!) {
    post(postId: $postId) {
      id
      title
      date
      body
      likes
    }
  }
`;

/**
 * __usePostPageQuery__
 *
 * To run a query within a React component, call `usePostPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostPageQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostPageQuery(
  baseOptions: Apollo.QueryHookOptions<PostPageQuery, PostPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostPageQuery, PostPageQueryVariables>(PostPageDocument, options);
}
export function usePostPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostPageQuery, PostPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostPageQuery, PostPageQueryVariables>(PostPageDocument, options);
}
export type PostPageQueryHookResult = ReturnType<typeof usePostPageQuery>;
export type PostPageLazyQueryHookResult = ReturnType<typeof usePostPageLazyQuery>;
export type PostPageQueryResult = Apollo.QueryResult<PostPageQuery, PostPageQueryVariables>;
