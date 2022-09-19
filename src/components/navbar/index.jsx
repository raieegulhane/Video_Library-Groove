import "./navbar.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts";
import { SearchBox } from "./searchbox";
import NavbarLogo from "../../assets/logos/groovv-logo.svg";
import { useState } from "react";

export const Navbar = () => {
    const { theme } = useTheme();
    return (
        <nav 
            className="nav-wr fx-r fx-js-sb fx-al-c"
        >
            <Link to={"/home"}>
                <img 
                    src={NavbarLogo} 
                    alt="groove-logo" 
                    className="nav-logo"
                />
            </Link>
            <div className="nav-sb-cn">
                <SearchBox />
            </div>
            <div className="fx-r fx-al-c gap-1">
                <button className="btn-icon">
                {
                    theme === "dark-theme" ? 
                    <i className="material-icons">light_mode</i> :
                    <i className="material-icons">dark_mode</i>
                }
                </button>
                <button className="btn btn-wt-i btn-outline btn-1">
                    Login
                    <i className="fa-solid fa-right-to-bracket"></i>
                </button>
            </div>
        </nav>
    );
}