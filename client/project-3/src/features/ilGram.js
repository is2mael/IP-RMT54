import { pull } from '@/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

export const ilgramsSlice = createSlice({
  name: 'ilgrams',
  initialState: {
    value: [],
  },
  reducers: {
    ilgramsLoading: (state, action) => {
      state.value = action.payload;
    },
    removeIlgram: (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
  },
});

export const { ilgramsLoading, removeIlgram } = ilgramsSlice.actions;

export const fetchIlgrams = () => async (dispatch) => {
  try {
    const response = await pull({
      method: "GET",
      url: "/favorites",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    dispatch(ilgramsLoading(response.data.data));
  } catch (error) {
    console.error("🚀 ~ fetchIlgrams ~ error:", error);
  }
};

export const removeFav = (id) => async (dispatch) => {
  try {
    await pull({
      method: "DELETE",
      url: `/favorites/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    dispatch(removeIlgram(id));
  } catch (error) {
    console.error("🚀 ~ removeFav ~ error:", error);
  }
};

export default ilgramsSlice.reducer;
