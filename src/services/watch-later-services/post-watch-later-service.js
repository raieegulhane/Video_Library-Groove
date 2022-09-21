import axios from "axios";

export const postWatchLaterService = (video, authToken) => {
    const response = axios.post(
        "/api/user/watchlater",
        { ...video },
        {headers: {authorization: authToken}}
    )
    return(response);
}