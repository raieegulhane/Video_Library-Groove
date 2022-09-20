import "./hero.css";
import HeroImage from "../../assets/images/img202.jpg";

export const Hero = () => {
    return (
        <header className="hero-wr fx-c">
            <img 
                className="hero-img"
                src={HeroImage}
                alt="hero"
            />
            <div className="hero-overlay">
            </div>
        </header>
    );
}