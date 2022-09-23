import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CommonPage } from "../../components";
import { useUserData } from "../../contexts";

export const CurrentPlaylist = () => {
    const { playlistId } = useParams();
    const { userDataState: { allPlaylists }} = useUserData();
    const currPlaylist = allPlaylists.find((playlist) => playlist._id === playlistId);
   
    return (
        <div className="page-wr">
        {
            currPlaylist === undefined ?
            <div className="page-empty-msg fx-c fx-al-c">
                <p>Unable to find playlists.</p>
                <Link 
                    to={"/"}
                    className="link-noDecoration btn btn-primary btn-sq btn-wt-i"
                >
                    <span className="material-icons-outlined">explore</span>
                    Explore
                </Link>
            </div> : 
            <CommonPage 
                itemList={currPlaylist.videos}
                page="current-playlist"
                title={currPlaylist.playlistTitle}
            />
        }
        </div>
    );
}