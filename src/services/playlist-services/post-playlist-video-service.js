import axios from "axios";

export const postPlaylistVideoService = (playlistId, video, authToken) => {
    const response = axios.post(
        `/api/user/playlists/${playlistId}`,
        { ...video },
        {headers: {authorization: authToken}}
    )
    return(response);
}