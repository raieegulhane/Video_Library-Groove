import axios from "axios";

export const deleteWatchLaterService = (videoId, authToken) => {
    const response = axios.delete(
        `/api/user/watchlater/${videoId}`,
        {headers: {authorization: authToken}}
    );
    return(response);
} 