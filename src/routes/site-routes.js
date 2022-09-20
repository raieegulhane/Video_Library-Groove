import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import {
    Home
} from "../pages";

export const SiteRoutes = () => {
    return (
        <Routes>
            <Route path="/mockman" element={<Mockman />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<Home />}></Route>
        </Routes>
    );
}