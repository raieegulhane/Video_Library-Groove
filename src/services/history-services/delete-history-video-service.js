import axios from "axios";

export const deleteHistoryVideoService = (videoId, authToken) => {
    const response = axios.delete(
        `/api/user/history/${videoId}`,
        {headers: {authorization: authToken}}
    );
    return(response);
}