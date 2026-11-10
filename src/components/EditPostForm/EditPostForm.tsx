import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import css from "./EditPostForm.module.css";
import type { Post } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title is too short")
    .max(50, "Title is too long")
    .required("Title is required"),
  body: Yup.string().max(500, "Content is too long").required("Content is required"),
});

interface EditPostFormProps {
  initialValues: Post;
  onClose: () => void;
}

export default function EditPostForm({ initialValues, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      alert("Post updated successfully");
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const handleEditPost = (values: Post) => {
    mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleEditPost}
      validationSchema={ValidationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            {isPending ? "Updating..." : "Edit post"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
