import axios from "axios";

let adminUrl = "https://wtsacademy.dedicateddevelopers.us/api/";

if (process.env?.REACT_APP_ENV === "production") {
  adminUrl = "https://wtsacademy.dedicateddevelopers.us/api/";
}

export const baseURL = adminUrl;
export const course_storagePath = baseURL + "/storage/";


let axiosInstance = axios.create({
  baseURL,
});

export const jobsDetailsPath = (media) => {
  return (
    `https://wtsacademy.dedicateddevelopers.us` + `/uploads/product/${media}`
  );
};

export const jobs_DetailsPath = (profile_picture) => {
  return (
    `https://wtsacademy.dedicateddevelopers.us` + `/uploads/user/profile_pic/${profile_picture}`
  );
};

// for userToken--> start

axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export const fetchBaseQueryInstance = () => {
  return {
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set(
        "x-access-token",
        localStorage.getItem("token") || sessionStorage.getItem("token")
      );

      return headers;
    },
  };
};

// for userToken-->end

export default axiosInstance;

