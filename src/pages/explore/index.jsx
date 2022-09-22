import "./explore.css";
import { useVideo, useOperation } from "../../contexts";
import { CardList, CategoryList, SortDropdown } from "../../components";
import { getFilteredAndSortedVideos } from "../../utils";

export const Explore = () => {
    const { videoState: { allVideos } } = useVideo();
    const { operationState, operationDispatch } = useOperation();

    const sortedAndFilteredVideoList = getFilteredAndSortedVideos(allVideos, operationState)

    return (
        <div className="explore-wr fx-c">
            <div className="op-cn fx-r">
                <CategoryList />
                <button 
                    className="btn-sort btn-wt-i btn-link"
                    onClick={() => operationDispatch({ type: "SORT_DROPDOWN" })}
                >
                    Sort 
                    <i className="material-icons-outlined">sort</i>
                </button>
                {
                    operationState.showSortDropdown &&
                    <SortDropdown />
                }
            </div>
            <div className="vid-list-info">
                <p className="">Videos found: <span className="ex-info-txt">{sortedAndFilteredVideoList.length}</span></p>
            </div>
            <CardList 
                videoList={sortedAndFilteredVideoList}
            />
        </div>
    );
}