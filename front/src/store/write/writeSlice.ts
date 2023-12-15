import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPost } from "./writeThunkFunction";
import toast from "react-hot-toast";

interface InitialState {
  editorState: string;
  title: string;
  content: any[];
  thumbnail: string;
  des: string;
  tags: [] | string[];
  isPublic: boolean;
  draft: boolean;

  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  editorState: "editor",
  title: "",
  content: [],
  thumbnail: "",
  des: "",
  tags: [],
  isPublic: true,
  draft: false,

  loading: false,
  error: "",
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    editorStateToggle: (state, action: PayloadAction<string>) => {
      state.editorState = action.payload;
    },

    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    setContent: (state, action: PayloadAction<any[]>) => {
      state.content = action.payload;
    },

    setThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },

    setDes: (state, action: PayloadAction<string>) => {
      state.des = action.payload;
    },

    setIsPublic: (state, action: PayloadAction<boolean>) => {
      state.isPublic = action.payload;
    },

    setAddTag: (state, action: PayloadAction<string>) => {
      state.tags = [...state.tags, action.payload];
    },
    setDeleteTag: (state, action: PayloadAction<string>) => {
      let newTags = state.tags.filter((tag) => tag !== action.payload);
      state.tags = newTags;
    },

    setDraft: (state, action: PayloadAction<boolean>) => {
      state.draft = action.payload;
    },

    reset: (state) => {
      (state.editorState = "editor"),
        (state.title = ""),
        (state.content = []),
        (state.thumbnail = ""),
        (state.des = ""),
        (state.tags = []),
        (state.isPublic = true),
        (state.draft = false);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      (state.editorState = "editor"),
        (state.title = action.payload.title),
        (state.content = action.payload.content),
        (state.thumbnail = action.payload.thumbnail),
        (state.des = action.payload.des),
        (state.tags = action.payload.tags),
        (state.isPublic = action.payload.isPublic),
        (state.draft = action.payload.draft);

      state.loading = false;
      state.error = "";
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  editorStateToggle,
  setTitle,
  setContent,
  setThumbnail,
  setDes,
  setIsPublic,
  setAddTag,
  setDeleteTag,
  setDraft,
  reset,
} = writeSlice.actions;

export default writeSlice.reducer;
