import "./hero.css";
import HeroImage from "../../assets/images/img20.jpg";

export const Hero = () => {
    return (
        <header className="hero-wr fx-c">
            <img 
                src={HeroImage}
                className="hero-img"
            />
            <div className="hero-overlay">
            </div>
        </header>
    );
}