import "./card-listing.css";
import { VideoCardVr } from "..";

export const CardList = ({ videoList }) => {
    return(
        <div className="cl-wr">
            <ul className="list-noBullets fx-r fx-wrap gap-1">
            {
                videoList.map((video) => {
                    return(
                        <li>
                            <VideoCardVr />
                        </li>
                    );
                })
            }
            </ul>
        </div>
    );
}