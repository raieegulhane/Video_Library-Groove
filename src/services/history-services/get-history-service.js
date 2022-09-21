import axios from "axios";

export const getHistoryService = (authToken) => {
    const response = axios.get(
        "/api/user/history",
        {headers: {authorization: authToken}}
    )
    return(response);
}