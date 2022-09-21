import axios from "axios";

export const getLikedService = (authToken) => {
    const response = axios.get(
        "/api/user/likes",
        {headers: {authorization: authToken}}
    )
    return(response);
}