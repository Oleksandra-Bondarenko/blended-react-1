import axios from "axios";
import type { NewPost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (
  searchText: string,
  page: number
): Promise<{ posts: Post[]; totalCount: number }> => {
  const res = await axios.get<Post[]>("/posts", {
    params: {
      q: searchText,
      _page: page,
      _limit: 8,
    },
  });

  const totalCount = Number(res.headers["x-total-count"]);

  return { posts: res.data, totalCount };
};

export const createPost = async (newPost: NewPost): Promise<Post> => {
  const res = await axios.post<Post>("/posts", newPost);
  return res.data;
};

export const editPost = async (newDataPost: Post): Promise<Post> => {
  const res = await axios.patch<Post>(`/posts/${newDataPost.id}`, newDataPost);
  return res.data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const res = await axios.delete<Post>(`/posts/${postId}`);
  return res.data;
};
