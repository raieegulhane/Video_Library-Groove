import axios from "axios";

export const getAllVideosService = () => {
    const response = axios.get("/api/videos");
    return(response);
}