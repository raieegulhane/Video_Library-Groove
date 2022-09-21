import axios from "axios";

export const getPlaylistService = (authToken) => {
    const response = axios.get(
        "/api/user/playlists",
        {headers: {authorization: authToken}}
    )
    return(response);
}