import "./playlist-card.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useUserData } from "../../contexts";
import { deletePlaylistService } from "../../services";

export const PlaylistCard = ({ playlist }) => {
    const { _id, playlistTitle, videos } = playlist;
    const { authState: { authToken }} = useAuth()
    const { userDataDispatch } = useUserData()

    const deletePlaylistHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            const { data: { playlists }} = await deletePlaylistService(_id, authToken);
            userDataDispatch({ type: "SET_PLAYLISTS", payload: playlists });
            toast.info(`"${playlistTitle}" playlist deleted`)
        } catch (error) {
            console.log("ERROR__PLAYLIST_CARD__DELETE_PLAYLIST: ", error);
            toast.error("Unable to delete playlist");
        }
    }

    return(
        <Link 
            to={`/playlist/${_id}`}
            className="link-noDecoration"
        >
            <div className="plc-wr fx-c">
                <div className="plc-img-cn">
                {
                    videos.length > 0 ?
                    <img 
                        className="plc-img img-100pc"
                        src={`https://i.ytimg.com/vi/${playlist.videos[0]._id}/mqdefault.jpg`}
                        alt={`playlist-${playlistTitle}`}
                    /> :
                    <div className="empty-pl-card fx-r fx-js-c fx-al-c">
                        <span className="txt-lg material-icons-outlined">
                            cancel_presentation
                        </span>
                    </div>
                }
                    
                    <div className="plc-img-ol fx-c fx-js-c fx-al-c">
                        <p className="plc-ol-txt">{videos.length}</p>
                        <span className="material-icons-outlined">queue_music</span>
                    </div>
                </div>
                <div className="plc-info-cn fx-r fx-js-sb fx-al-c">
                    <h2 className="plc-title">{playlistTitle}</h2>
                    <button 
                        className="plc-btn btn-icon"
                        onClick={deletePlaylistHandler}
                    >
                        <i className="plc-btn-icon fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </Link>
    );
}