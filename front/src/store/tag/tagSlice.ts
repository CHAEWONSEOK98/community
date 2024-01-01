import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTags } from "./tagThunkFunction";

interface initialState {
  tagState: string;
  tags: string[];
  loading: boolean;
  error: string;
}

const initialState: initialState = {
  tagState: "",
  tags: [],
  loading: false,
  error: "",
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTagState: (state, action: PayloadAction<string>) => {
      state.tagState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTags.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
      state.loading = false;
    });
    builder.addCase(getTags.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setTagState } = tagSlice.actions;

export default tagSlice.reducer;
