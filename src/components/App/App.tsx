import { useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Modal from "../Modal/Modal";
// import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";

export default function App() {
  const { data, isSuccess } = useQuery({
    queryKey: ["posts", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {/* <Pagination /> */}
        <button className={css.button}>Create post</button>
      </header>
      {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}
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
