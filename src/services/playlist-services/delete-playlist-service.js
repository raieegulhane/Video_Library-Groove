import axios from "axios";

export const deletePlaylistService = (playlistId, authToken) => {
    const response = axios.delete(
        `/api/user/playlists/${playlistId}`,
        {headers: {authorization: authToken}}
    );
    return(response);
} 