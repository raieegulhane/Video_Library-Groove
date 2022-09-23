import "./card-listing.css";
import { VideoCardVr, PlaylistCard } from "..";

export const CardList = ({ itemList, page }) => {
    return(
        <div className="card-list-wr">
            <ul className="list-noBullets fx-r fx-wrap fx-js-s fx-al-c">
            {
                itemList.map((item) => {
                    return(
                        <li key={item._id}>
                        {
                            page === "playlist" ?
                            <PlaylistCard 
                                playlist={item}
                            /> :
                            <VideoCardVr 
                                video={item}
                                page={page}
                            />
                        }
                        </li>
                    );
                })
            }
            </ul>
        </div>
    );
}