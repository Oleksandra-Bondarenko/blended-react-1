import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";
import type { Post } from "../../types/post";

interface PostListProps {
  posts: Post[];
  toggleEditPost: (post: Post) => void;
  toggleModal: () => void;
}

export default function PostList({ posts, toggleEditPost, toggleModal }: PostListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert("Post deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button
              className={css.edit}
              onClick={() => {
                toggleEditPost(post);
                toggleModal();
              }}
            >
              Edit
            </button>
            <button className={css.delete} onClick={() => mutate(post.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
