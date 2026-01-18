import axios from "axios"; 


const axiosInstanceUtility = axios.create({
  baseURL : import.meta.env.VITE_API_URL,
  
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  }, 
});

export default axiosInstanceUtility;