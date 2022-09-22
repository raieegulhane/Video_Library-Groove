import axios from "axios";

export const deleteHistoryService = (authToken) => {
    const response = axios.delete(
        "/api/user/history/all",
        {headers: {authorization: authToken}}
    );
    return(response);
} 