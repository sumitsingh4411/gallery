import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getFlickrApiUrl, getImage } from "../../utils/functions";
import { get } from "http";

export interface IStatus {
  LOADING: string;
  SUCCESS: string;
  ERROR: string;
}

export const STATUS: IStatus = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export interface GalleryState {
  images: any[];
  page: number;
  searchText: string;
  status: string;
  error: string;
}

const initialState: GalleryState = {
  images: [],
  page: 1,
  searchText: "",
  status: STATUS.LOADING,
  error: "",
};

export interface Option {
  page: number;
  searchText: string;
}

const getImagesList = createAsyncThunk(
  "gallery/getImagesList",
  async (option: Option) => {
    try {
      const response = await axios.get(
        getFlickrApiUrl(option.page, option.searchText)
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.images = [];
      state.page = 1;
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImagesList.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getImagesList.fulfilled, (state, action) => {
        state.images = [...state.images, ...getImage(action?.payload)];
        console.log(state.images, getImage(action?.payload));
        if (state.images.length !== 0 && getImage(action?.payload)?.length === 0) {
          state.error = "No more images found";
        } else if (state.images.length === 0) {
          state.error = "No images found";
        } else {
          state.error = "";
        }
        state.status = STATUS.SUCCESS;
      })
      .addCase(getImagesList.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const { setPage, setSearchText } = gallerySlice.actions;

export const selectGallery = (state: any) => state.gallery;
export const galleryActions = { getImagesList };

export default gallerySlice.reducer;
