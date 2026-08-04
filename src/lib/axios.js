import axios from "axios";

const API_BASE = process.env.MOVIE_API_URL
const API_KEY = process.env.MOVIE_API_KEY
const Bearer = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWU3ZmUyYWY2NjJjOTkxNjM5YWI1ZWJiNjdmMWMzOSIsIm5iZiI6MTc2OTM3MjMzMy45LCJzdWIiOiI2OTc2N2FhZDBhNDI3ZDNhMjAxYTBlZjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Rsk2DmTkwdZArMxaYYFcpBN_WDGWtGxClA04lROae34"
export const axiosInstance = axios.create({
    baseURL: `${API_BASE}`,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers["X-Api-Key"] = API_KEY
        if (Bearer) config.headers.Authorization = Bearer

        return config
    },
    (error) => Promise.reject(error)
)

