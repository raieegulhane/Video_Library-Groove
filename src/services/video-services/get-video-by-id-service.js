import axios from "axios";

export const getVideoByIdService = (videoId) => {
    const response = axios.get(`/api/video/${videoId}`);
    return(response);
}