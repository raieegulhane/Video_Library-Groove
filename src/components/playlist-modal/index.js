import "./playlist-modal.css";
import { useAuth, useOperation, useUserData } from "../../contexts";
import { useState } from "react";
import { toast } from "react-toastify";
import { deletePlaylistVideoService, postPlaylistService, postPlaylistVideoService } from "../../services";

export const PlaylistModal = ({ video }) => {
    const { authState: { authToken } } = useAuth();
    const { operationDispatch } = useOperation();
    const { userDataState: { allPlaylists }, userDataDispatch } = useUserData();
    const [newPlaylistName, setNewPlaylistName] = useState();

    const videoInPaylist = (playlistVideoList) => {
        return(
            playlistVideoList.find(
                (item) => item._id === video._id
            ) === undefined ? 
            false : 
            true
        );
    }

    const playlistChangeHandler = async (currPlaylist) => {
        const { _id, playlistTitle, videos } = currPlaylist;
        try {
            if (videoInPaylist(videos)) {
                const { data: { playlist }} = await deletePlaylistVideoService(_id, video._id, authToken);
                userDataDispatch({ type: "UPDATE_PLAYLIST", payload: playlist });
                toast.info(`${video.title} was removed from ${playlistTitle}`);
            } else {
                const { data: { playlist }} = await  postPlaylistVideoService(_id, video, authToken);
                userDataDispatch({ type: "UPDATE_PLAYLIST", payload: playlist });
                toast.success(`${video.title} was added to ${playlistTitle}`);
            }
                
        } catch (error) {
            console.log("ERROR__PLAYLIST_MODAL__ADD_VIDEO_TO_PLAYLIST: ", error);
            if (error.response.status === 409) {
                toast.info("Video already present in this playlist")
            } else {
                toast.error("Unable to add video to playlist");
            }
        }
    }

    const addNewPlaylistHandler = async (event) => {
        const { value } = event.target
        if (event.key === "Enter" && !value) {
            toast.warning("Enter playlist name");
        }
        if (event.key === "Enter" && value) {
            setNewPlaylistName("");
            try {
                const { data: { playlists }} = await postPlaylistService({ playlist: { playlistTitle: value } }, authToken);
                userDataDispatch({ type: "SET_PLAYLISTS", payload: playlists });
                toast.success("New playlist added");
            } catch (error) {
                console.log("ERROR__PLAYLIST_MODAL__POST_PLAYLIST: ", error);
                if (error.response.status === 409) {
                    toast.warning("Playlist with this name already exists")
                } else {
                    toast.error("Sorry. Unable to create playlist");
                }
            }
        } 
    }

    return(
        <div className="pm-wr">
            <div className="pm-cn fx-c">
                <button 
                    className="btn-icon pm-close-btn"
                    onClick={() => operationDispatch({ type: "PLAYLIST_MODAL" })}
                >
                    <span className="pm-btn-icon material-icons-outlined">close</span>
                </button>
                <div className="new-pl-cn">
                    <h2 className="pm-heading">Create new playlist:</h2>
                    <div className="pm-inp-cn fx-r fx-js-sb fx-al-c">
                        <input
                            className="pm-inp"
                            type="text"
                            placeholder="Type and hit enter..."
                            value={newPlaylistName}
                            onChange={(e) => {setNewPlaylistName(e.target.value)}}
                            onKeyDown={addNewPlaylistHandler}
                        ></input>
                        <button className="pm-inp-btn btn-icon">
                            <span className="material-icons-outlined">add</span>
                        </button>
                    </div>
                </div>
                {
                    allPlaylists.length > 0 &&
                    <div className="existing-pl-cn">
                        <h2 className="pm-heading">Add to playlist:</h2>
                        <ul className="pm-pl-list fx-c list-noBullets">
                        {
                            allPlaylists.map((playlist) => {
                                const { _id, playlistTitle, videos } = playlist;
                                return(
                                    <li key={_id}>
                                        <label
                                            className="pm-pl-label fx-r"
                                            htmlFor={playlistTitle}
                                        >
                                            <input
                                                id={playlistTitle} 
                                                type="checkbox"
                                                name={`${playlistTitle}-playlist`}
                                                value={playlistTitle}
                                                checked={videoInPaylist(videos)}
                                                onChange={() => playlistChangeHandler(playlist)}
                                            />
                                            {playlistTitle}
                                        </label>
                                    </li>
                                );
                            })
                        }
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}