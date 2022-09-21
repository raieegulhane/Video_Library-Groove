import axios from "axios";

export const getPlaylistVideosService = (playlistId, authToken) => {
    const response = axios.get(
        `/api/user/playlists/${playlistId}`,
        {headers: {authorization: authToken}}
    );
    return(response);
}