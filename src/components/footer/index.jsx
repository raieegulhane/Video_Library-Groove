import "./footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <footer className="footer-wr fx-c fx-al-c">
            <div className="footer-cn fx-c fx-al-c">
                <p>Made with &lt;/&gt; by Raiee</p>
                <p>&copy; 2022, Nirvana</p>
                <div className="socials-cn fx-r">
                    <a 
                        className="socials-icon-btn btn-icon link-noDecoration" 
                        href="https://twitter.com/RaieeGulhane"
                    >
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a 
                        className="socials-icon-btn btn-icon link-noDecoration" 
                        href="https://github.com/raieegulhane"
                    >
                        <i className="fa-brands fa-github-alt"></i>
                    </a>
                    <a 
                        className="socials-icon-btn btn-icon link-noDecoration" 
                        href="https://www.linkedin.com/in/raiee-gulhane-694272185
                        "
                    >
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}