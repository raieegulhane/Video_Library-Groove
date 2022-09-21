import "./explore.css";
import { useVideo } from "../../contexts";
import { CardList } from "../../components";

export const Explore = () => {
    const { videoState, videoDispatch } = useVideo();
    const {
        allVideos,
        allCategories,
    } = videoState;

    return (
        <div className="explore-wr fx-c">
            <div className="ex-btn-cn fx-r">
                <button 
                    className="btn btn-cr btn-outline category-chip"
                >
                    All
                </button>
                {
                    allCategories.map(({_id, categoryName}) => {
                        return(
                            <button 
                                className="btn btn-cr btn-outline category-chip"
                                key={_id}
                            >
                                {categoryName}
                            </button>  
                        );
                    })
                }
                <button className="btn-sort btn-wt-i btn-link">
                    Sort 
                    <i class="material-icons-outlined">sort</i>
                </button>
            </div>
            <div className="vid-list-info">
                <p className="">Videos found: <span className="ex-info-txt">{allVideos.length}</span></p>
            </div>
            <CardList 
                videoList={allVideos}
            />
        </div>
    );
}