import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Modal from "../Modal/Modal";
// import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import type { Post } from "../../types/post";
import Pagination from "../Pagination/Pagination";
import PostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import Modal from "../Modal/Modal";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [isEditPost, setIsEditPost] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["posts", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSetSearchQuery = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const toggleEditPost = (post: Post) => {
    setEditedPost(post);
    setIsEditPost(true);
  };

  const totalPages = data ? Math.ceil(data?.totalCount / 8) : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSetSearchQuery} queryValue={searchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsModalOpen(true);
            setIsCreatePost(true);
          }}
        >
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {isCreatePost && (
            <PostForm
              onClose={() => {
                setIsModalOpen(false);
                setIsCreatePost(false);
              }}
            />
          )}

          {isEditPost && editedPost && (
            <EditPostForm
              initialValues={editedPost}
              onClose={() => {
                setIsModalOpen(false);
                setIsEditPost(false);
                setEditedPost(null);
              }}
            />
          )}
        </Modal>
      )}
      {isSuccess && data.posts.length > 0 && (
        <PostList
          posts={data.posts}
          toggleEditPost={toggleEditPost}
          toggleModal={() => setIsModalOpen(true)}
        />
      )}
    </div>
  );
}
