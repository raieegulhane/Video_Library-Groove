import axios from "axios";

export const postHistoryService = (video, authToken) => {
    const response = axios.post(
        "/api/user/history",
        { ...video },
        {headers: {authorization: authToken}}
    )
    return(response);
}