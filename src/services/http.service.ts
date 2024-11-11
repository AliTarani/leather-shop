import axios from "axios";

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // base API URL
  timeout: 10000, // Timeout for requests
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

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

// Function to make GET requests
const get = <T>(
  url: string,
  params: Record<string, any> = {}
): { request: Promise<any>; cancel: () => void } => {
  const controller = new AbortController();
  const request = axiosInstance
    .get<T[]>(url, {
      params,
      signal: controller.signal, // Pass the controller's signal to cancel the request
    })
    .then((response) => response.data); // Return the response data directly

  return {
    request,
    cancel: () => controller.abort(),
  };
};

// Function to make POST requests
const post = <T>(
  url: string,
  data: any
): { request: Promise<any>; cancel: () => void } => {
  const controller = new AbortController();
  const request = axiosInstance
    .post<T>(url, data, { signal: controller.signal })
    .then((response) => response.data);

  return {
    request,
    cancel: () => controller.abort(),
  };
};

// Function to make PUT requests
const put = <T>(
  url: string,
  data: any
): { request: Promise<any>; cancel: () => void } => {
  const controller = new AbortController();
  const request = axiosInstance
    .put<T>(url, data, { signal: controller.signal })
    .then((response) => response.data);

  return {
    request,
    cancel: () => controller.abort(),
  };
};

// Function to make DELETE requests
const remove = (
  url: string
): { request: Promise<any>; cancel: () => void } => {
  const controller = new AbortController();
  const request = axiosInstance
    .delete(url, { signal: controller.signal })
    .then((response) => response.data);

  return {
    request,
    cancel: () => controller.abort(),
  };
};

// Expose the service functions
export default {
  get,
  post,
  put,
  delete: remove, // Renaming delete to avoid conflicts with JS keyword
};
