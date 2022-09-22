import { useUserData } from "../../contexts";
import { CommonPage } from "../../components";

export const WatchLater = () => {
    const { userDataState : { watchLater }} = useUserData();

    return (
        <CommonPage 
            videoList={watchLater}
            page="watchlater"
        />
    );
}