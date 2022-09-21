import "./card-listing.css";
import { VideoCardVr } from "..";

export const CardList = ({ videoList }) => {
    return(
        <div className="cl-wr">
            <ul className="list-noBullets fx-r fx-wrap fx-js-se">
            {
                videoList.map((video, index) => {
                    return(
                        <li key={index}>
                            <VideoCardVr 
                                video={video}
                            />
                        </li>
                    );
                })
            }
            </ul>
        </div>
    );
}