import { toast } from "react-toastify";
import { useAuth, useUserData } from "../../contexts";
import { deleteHistoryService } from "../../services";
import { CommonPage } from "../../components";

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
        <CommonPage 
            itemList={history}
            page="history"
            title="History"
            onClick={clearHistoryHandler}
        />
    );
}