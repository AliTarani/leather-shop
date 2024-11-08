import axios, { CancelTokenSource } from "axios";

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // base API URL
  timeout: 10000, // Timeout for requests
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Cancel token management
let cancelTokenSource: CancelTokenSource | null = null;

// Set up request interceptor to add authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // or use your global auth state (e.g., Redux)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Retry on network errors (e.g., timeouts, no internet)
    const config = error.config;
    if (!config || error.response) {
      // If error response exists, handle custom error (e.g., 401, 500)
      return Promise.reject(error);
    }

    if (config.retries && config.retries > 0) {
      config.retries -= 1;
      console.log(`Retrying request... ${config.retries} attempts left.`);
      return axiosInstance(config); // Retry request
    }

    // Default error handler
    console.error("Request failed:", error.message);
    return Promise.reject(error);
  }
);

// Utility to cancel ongoing requests
const cancelRequest = () => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Request cancelled by the user");
    cancelTokenSource = axios.CancelToken.source(); // Reset the cancel source
  }
};

// Utility to create a Cancel Token for specific requests
const getCancelToken = () => {
  cancelTokenSource = axios.CancelToken.source();
  return cancelTokenSource.token;
};

// Function to make GET requests
const get = (
  url: string,
  params: Record<string, any> = {},
  cancelToken: any = null
): Promise<any> => {
  return axiosInstance
    .get(url, {
      params,
      cancelToken,
    })
    .then((response) => response.data); // Return the response data directly
};

// Function to make POST requests
const post = (
  url: string,
  data: any,
  cancelToken: any = null
): Promise<any> => {
  return axiosInstance
    .post(url, data, { cancelToken })
    .then((response) => response.data);
};

// Function to make PUT requests
const put = (url: string, data: any, cancelToken: any = null): Promise<any> => {
  return axiosInstance
    .put(url, data, { cancelToken })
    .then((response) => response.data);
};

// Function to make DELETE requests
const remove = (url: string, cancelToken: any = null): Promise<any> => {
  return axiosInstance
    .delete(url, { cancelToken })
    .then((response) => response.data);
};

// Expose the service functions
export default {
  get,
  post,
  put,
  delete: remove, // Renaming delete to avoid conflicts with JS keyword
  cancelRequest,
  getCancelToken,
};
