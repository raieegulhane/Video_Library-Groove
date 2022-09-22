import axios from "axios";

export const deletePlaylistVideoService = (playlistId, videoId, authToken) => {
    const response = axios.delete(
        `/api/user/playlists/${playlistId}/${videoId}`,
        {headers: {authorization: authToken}}
    );
    return(response);
} 