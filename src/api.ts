import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;
const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/repos',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
