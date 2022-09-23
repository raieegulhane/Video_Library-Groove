import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import {
    Login, 
    Signup,
    Explore,
    VideoPlayer,
    Playlist,
    CurrentPlaylist,
    Liked,
    WatchLater,
    History
} from "../pages";
import { PrivateRoutes } from ".";

export const SiteRoutes = () => {
    return (
        <Routes>
            <Route path="/mockman" element={<Mockman />} />            

            {/* auth routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> 

            {/* public routes */}
            <Route path="/" element={<Explore />} />
            <Route path="/video/:videoId" element={<VideoPlayer />} />

            {/* private routes */}
            <Route path="/" element={<PrivateRoutes />}>
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/playlist/:playlistId" element={<CurrentPlaylist />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/watch-later" element={<WatchLater />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    );
}