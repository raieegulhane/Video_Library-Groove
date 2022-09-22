import "./history.css";
import { useAuth, useUserData } from "../../contexts";
import { CardList } from "../../components";
import { Link } from "react-router-dom";
import { deleteHistoryService } from "../../services";
import { toast } from "react-toastify";

export const History = () => {
    const { authState: { authToken }} = useAuth();
    const { userDataState: { history }, userDataDispatch} = useUserData();

    const clearHistoryHandler = async () => {
        try {
            const { data: { history }} = await deleteHistoryService(authToken);
            userDataDispatch({ type: "SET_HISTORY", payload: history });
            toast.info("History is cleared");
        } catch (error) {
            console.log("ERROR__HISTORY__DELETE__HISTORY: ", error);
        }
    }

    return (
        <div className="hist-wr">
            <header className="hist-header fx-r fx-js-sb">
                <h1 className="hist-heading fx-r fx-al-c">
                    <span class="material-icons-outlined">history</span>
                    <span>History</span>
                </h1>
                <button 
                    className="btn btn-outline btn-wt-i btn-sq"
                    onClick={clearHistoryHandler}
                >
                    Clear History
                    <i className="fa-solid fa-trash"></i>
                </button>
            </header>
            <div className="hist-cn">
                {
                    history.length > 0 ?
                    <CardList
                        videoList={history}
                        page={"history"}
                    /> :
                    <div className="hist-empty-msg fx-c fx-al-c">
                        <p>Nothing found in history. You have not watched any videos.</p>
                        <Link 
                            to={"/"}
                            className="link-noDecoration btn btn-primary btn-sq btn-wt-i"
                        >
                            <span class="material-icons-outlined">explore</span>
                            Explore
                        </Link>
                    </div>
                }
                
            </div>

        </div>
    );
}