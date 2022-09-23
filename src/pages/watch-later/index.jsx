import { useUserData } from "../../contexts";
import { CommonPage } from "../../components";

export const WatchLater = () => {
    const { userDataState : { watchLater }} = useUserData();

    return (
        <CommonPage 
            itemList={watchLater}
            page="watchlater"
            title="Watch Later"
        />
    );
}