import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  logInUser,
  logOutUser,
  updateUser,
  deleteUser,
  getUser,
} from "./userThunkFunction";

interface CurrentUser {
  createdAt: string;
  email: string;
  profilePicture: string;
  username: string;
  __v: number;
  _id: string;
}

interface InitialState {
  currentUser: null | CurrentUser;
  loading: boolean;
  error: boolean;
}

const initialState: InitialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      logInUser.fulfilled,
      (state, action: PayloadAction<CurrentUser>) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
      },
    );
    builder.addCase(logInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(logOutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
