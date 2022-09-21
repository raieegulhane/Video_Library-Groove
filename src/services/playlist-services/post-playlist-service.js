import axios from "axios";

export const postPlaylistService = (playlist, authToken) => {
    const response = axios.post(
        "/api/user/playlists",
        { ...playlist },
        {headers: {authorization: authToken}}
    )
    return(response);
}