import "./card-listing.css";
import { VideoCardVr } from "..";

export const CardList = ({ videoList, page }) => {
    return(
        <div className="card-list-wr">
            <ul className="list-noBullets fx-r fx-wrap fx-js-s">
            {
                videoList.map((video, index) => {
                    return(
                        <li key={index}>
                            <VideoCardVr 
                                video={video}
                                page={page}
                            />
                        </li>
                    );
                })
            }
            </ul>
        </div>
    );
}