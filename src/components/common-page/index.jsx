import "./common-page.css";
import { Link } from "react-router-dom";
import { CardList } from "..";

export const CommonPage = ({ itemList, page, title, onClick }) => {
    return(
        <div className="page-wr">
            <header className="page-header fx-r fx-js-sb">
                <h1 className="page-heading fx-r fx-al-c">
                    <span className="material-icons-outlined">
                        {page === "playlist" && "queue_music"}
                        {page === "current-playlist" && "music_note"}
                        {page === "liked" && "thumb_up"}
                        {page === "watchlater" && "watch_later"}
                        {page === "history" && "history"}
                    </span>
                    <span>{title}</span>
                </h1>
                {
                    page==="history" &&
                    itemList.length > 0 &&
                    <button 
                        className="btn btn-outline btn-wt-i btn-sq"
                        onClick={onClick}
                    >
                        Clear History
                        <i className="fa-solid fa-trash"></i>
                    </button>
                }
            </header>
            <div>
                {
                    itemList.length > 0 ?
                    <CardList
                        itemList={itemList}
                        page={page}
                    /> :
                    <div className="page-empty-msg fx-c fx-al-c">
                        <p>
                            { page === "playlist" && "You have not created any playlists yet."}
                            { page === "current-playlist" && "No videos added to this playlist"}
                            { page === "liked" && "You have not liked any videos."}
                            { page === "watchlater" && "You have saved any videos for watching later."}
                            { page === "history" && "Nothing found in history. You have not watched any videos."}
                        </p>
                        <Link 
                            to={"/"}
                            className="link-noDecoration btn btn-primary btn-sq btn-wt-i"
                        >
                            <span className="material-icons-outlined">explore</span>
                            Explore
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}