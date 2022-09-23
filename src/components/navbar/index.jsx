import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useTheme } from "../../contexts";
import { SearchBox } from "./searchbox";
import NavbarLogo from "../../assets/logos/nirvana-logo.svg";

export const Navbar = () => {
    const navigate = useNavigate();
    const { authState: { isAuth }, authDispatch } = useAuth();

    const authButtonHandler = () => {
        if (isAuth) {
            localStorage.removeItem("auth-token");
            localStorage.removeItem("user-data");
    
            authDispatch({ type: "AUTH_CLEAR" });
    
            navigate("/login");
            toast.success("Logged out.")
        } else {
            navigate("/login");
        }
    }
    return (
        <nav 
            className="nav-wr fx-r fx-js-sb fx-al-c"
        >
            <Link to={"/"}>
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
                <button 
                    className="btn btn-wt-i btn-outline btn-1"
                    onClick={authButtonHandler}
                >
                {
                    isAuth ?
                    <span>Logout</span> :
                    <span>Login</span>
                }
                {
                    isAuth ?
                    <i className="fa-solid fa-right-from-bracket"></i> :
                    <i className="fa-solid fa-right-to-bracket"></i>
                }
                </button>
            </div>
        </nav>
    );
}