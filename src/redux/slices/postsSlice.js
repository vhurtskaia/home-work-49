import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const POSTS_LIMIT = 6;

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, {signal, rejectWithValue}) => {
    try {
      const response = await fetch(API_URL, {signal});

      if (!response.ok) {
        return rejectWithValue(`Помилка API: ${response.status}`);
      }

      const data = await response.json();
      return data.slice(0, POSTS_LIMIT);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }

      return rejectWithValue("Не вдалося завантажити пости. Спробуйте ще раз.");
    }
  },
  {
    condition: (_, {getState}) => {
      const status = getState().posts.status;
      return status !== "loading";
    },
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // Aborted requests are not treated as a user-facing error.
        if (action.meta.aborted) return;

        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Сталася невідома помилка";
      });
  },
});

export default postsSlice.reducer;

export const selectPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
