import {createSlice} from '@reduxjs/toolkit';
import { postCategory } from './categoryThunkFunction';

interface initialState {

}

const initialState = {

}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postCategory.pending, (state) => {

        });
        builder.addCase(postCategory.fulfilled, (state, action) => {

        });
        builder.addCase(postCategory.rejected, (state,action) => {

        })
    }
})

export default categorySlice.reducer;