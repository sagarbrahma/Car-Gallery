import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  add_list: null,
  list_edit: null,
  list: [{}],
  Details: {},
  totalpage: "",
};

export const Product = createAsyncThunk(
  "Product",

  async (formData) => {
    let res = await axiosInstance.post(`product/create`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const productList = createAsyncThunk(
  "ProductList",

  async (formData) => {
    let res = await axiosInstance.post(`product/list`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const EditList = createAsyncThunk(
  "EditList",

  async (id) => {
    let res = await axiosInstance.get(`product/detail/${id}`);

    let resData = res?.data;

    return resData;
  }
);

export const update = createAsyncThunk(
  "update",

  async (formData) => {
    let res = await axiosInstance.post(`product/update`, formData);
    console.log(formData, "formData");

    let resData = res?.data;

    return resData;
  }
);

export const DeleteProduct = createAsyncThunk(
  "delete",

  async (formData) => {
    let res = await axiosInstance.post(`product/remove`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const CrudSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    add_to_list: (state, { payload }) => {
      state.add_list = payload;
    },
    handle_redirection: (state, { payload }) => {
      localStorage.removeItem("Title");
    },
    list_to_edit: (state, { payload }) => {
      state.list_edit = payload;
    },
    handle_redirect: (state, { payload }) => {
      localStorage.removeItem("message");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(Product.pending, (state, action) => {})
      .addCase(Product.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.add_list = "/";
          localStorage.setItem("Title", payload?.data.title);
          toast(payload?.message);
        }
      })
      .addCase(Product.rejected, (state, action) => {})
      .addCase(productList.pending, (state, action) => {})
      .addCase(productList.fulfilled, (state, { payload }) => {
        state.list = payload.data;
        state.totalpage = payload?.totalPages;
      })
      .addCase(productList.rejected, (state, action) => {})
      .addCase(EditList.pending, (state, action) => {})
      .addCase(EditList.fulfilled, (state, { payload }) => {
        state.Details = payload.data;
      })
      .addCase(EditList.rejected, (state, action) => {})
      .addCase(update.pending, (state, action) => {})
      .addCase(update.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.list_edit = "/";
          localStorage.setItem("message", payload?.message);
          toast(payload?.message);
        }
        
      })
      .addCase(update.rejected, (state, action) => {})
      .addCase(DeleteProduct.pending, (state, action) => {})
      .addCase(DeleteProduct.fulfilled, (state, { payload }) => {
        toast(payload?.message);
      })
      .addCase(DeleteProduct.rejected, (state, action) => {});
  },
});

export const {
  add_to_list,
  handle_redirection,
  list_to_edit,
  handle_redirect,
} = CrudSlice.actions;

