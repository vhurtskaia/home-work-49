import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
} from "../redux/slices/postsSlice";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  const isLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Posts from JSONPlaceholder
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Дані завантажуються через Redux Toolkit (createAsyncThunk).
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <p className="text-sm text-slate-500">
            Завантаження постів...
          </p>
        </div>
      )}

      {status === "failed" && (
        <div className="flex items-center justify-between gap-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchPosts())}
            className="shrink-0 rounded-lg bg-red-600 px-3 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Повторити
          </button>
        </div>
      )}

      {status === "succeeded" && (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:shadow-sm"
            >
              <span className="text-xs font-semibold text-indigo-600">
                Post #{post.id}
              </span>

              <h3 className="mt-2 font-semibold capitalize text-slate-900">
                {post.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {post.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Posts;
