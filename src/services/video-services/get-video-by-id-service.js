import axios from "axios";

export const getVideoByIdService = (videoId) => {
    const response = axios.get(`/api/videos/${videoId}`);
    return(response);
}