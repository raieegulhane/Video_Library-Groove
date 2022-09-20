import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import {
    Login, 
    Signup,
    Home,
    Explore,
    // VideoPlayer,
    Playlist,
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
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            {/* <Route path="/videoplayer" element={<Home />} /> */}

            {/* private routes */}
            <Route path="/" element={<PrivateRoutes />}>
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/watch-later" element={<WatchLater />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    );
}