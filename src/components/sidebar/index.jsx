import "./sidebar.css";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
    return (
        <aside className="sidebar-wr fx-c">
            <NavLink 
                className="sb-link fx-r"
                to={"/"}
            >
                <i className="material-icons-outlined">explore</i>
                Explore
            </NavLink>
            <NavLink 
                to={"/playlist"}
                className="sb-link fx-r"
            >
                <i className="material-icons-outlined">video_library</i>
                <span>Playlists</span>
            </NavLink>
            <NavLink 
                to={"/liked"}
                className="sb-link fx-r"
            >
                <i className="material-icons-outlined">thumb_up</i>
                Liked Videos
            </NavLink>
            <NavLink 
                to={"/watch-later"}
                className="sb-link fx-r"
            >
                <i className="material-icons-outlined">watch_later</i>
                Watch Later
            </NavLink>
            <NavLink 
                to={"/history"}
                className="sb-link fx-r"
            >
                <i className="material-icons-outlined">history</i>
                History
            </NavLink>
        </aside>
    );
}