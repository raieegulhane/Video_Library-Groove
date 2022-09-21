import axios from "axios";

export const getWatchLaterService = (authToken) => {
    const response = axios.get(
        "/api/user/watchlater",
        {headers: {authorization: authToken}}
    )
    return(response);
}