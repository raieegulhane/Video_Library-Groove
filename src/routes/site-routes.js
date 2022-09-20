import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import {
    Home,
    Explore,
    // VideoPlayer,
    Playlist,
    Liked,
    WatchLater,
    History
} from "../pages";

export const SiteRoutes = () => {
    return (
        <Routes>
            <Route path="/mockman" element={<Mockman />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            {/* <Route path="/videoplayer" element={<Home />}></Route> */}
            <Route path="/playlist" element={<Playlist />}></Route>
            <Route path="/liked" element={<Liked />}></Route>
            <Route path="/watch-later" element={<WatchLater />}></Route>
            <Route path="/history" element={<History />}></Route>
        </Routes>
    );
}