import axios from "axios";

export const postLikedService = (video, authToken) => {
    const response = axios.post(
        "/api/user/likes",
        { ...video },
        {headers: {authorization: authToken}}
    )
    return(response);
}