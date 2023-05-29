import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  login_status: "idle",
  status: "idle",
  isloggedIn: false,
  redirectTo: null,
  redirection: null,
  profile_details: {},
  title: false,
  image: false
};

export const register = createAsyncThunk(
  "register",

  async (formData) => {
    let res = await axiosInstance.post(`user/signup`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const login = createAsyncThunk(
  "login",

  async (formData) => {
    let res = await axiosInstance.post(`user/signin`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const profiledetails = createAsyncThunk(
  "profile-details",

  async (formData) => {
    let res = await axiosInstance.get(`user/profile-details`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const AuthSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    reset_redirection: (state, { payload }) => {
      state.redirection = payload;
    },
    reset_redirectTo: (state, { payload }) => {
      state.redirectTo = payload;
    },
    check_token: (state, { payload }) => {
      let token = localStorage.getItem("token");
      if (token !== null && token !== undefined) {
        state.isloggedIn = true;
      }
    },
    handle_redirection: (state, { payload }) => {
      localStorage.removeItem("Name");
    },
    handleLoggedout: (state, { payload }) => {
      localStorage.removeItem("token");
      state.isloggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(register.pending, (state, action) => {
        state.status = "loading";
        console.log(state.status, "Registration Page Loading...");
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status === 200) {
          state.redirection = "/login";
          localStorage.setItem("Name", payload?.data.first_name);
          toast(payload?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = "idle";
        console.log(state.status, "Registration Process got Failed!");
        toast(payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })

      .addCase(login.pending, (state, action) => {
        state.login_status = "loading";
        console.log(state.login_status, "Login Page is Loading...");
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.redirectTo = "/";
          state.isloggedIn = true;
          state.title = true;
          state.image = true;

          localStorage.setItem("token", payload?.token);
          localStorage.setItem("Name", payload?.data.first_name);
          localStorage.setItem("Title", payload?.data.last_name);
          localStorage.setItem("Profile_Picture", payload?.data.profile_pic);

      
          console.log(state.login_status, "Login done Successfully!");
          toast(payload?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        if (payload.status === 201) {
          state.login_status = "idle";
          // toast(payload?.message);
          toast(payload?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(state.login_status, "Login remains Unsuccessful!");
        }
      })
      .addCase(profiledetails.pending, (state, action) => {})
      .addCase(profiledetails.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.profile_details = payload.data;
        }
      })
      .addCase(profiledetails.rejected, (state, action) => {});
  },
});

export const {
  reset_redirection,
  reset_redirectTo,
  check_token,
  handle_redirection,
  handleLoggedout,
} = AuthSlice.actions;

