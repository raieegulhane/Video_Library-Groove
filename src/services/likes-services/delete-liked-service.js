import axios from "axios";

export const deleteLikedService = (videoId, authToken) => {
    const response = axios.delete(
        `/api/user/likes/${videoId}`,
        {headers: {authorization: authToken}}
    );
    return(response);
} 