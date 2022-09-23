import { useUserData } from "../../contexts";
import { CommonPage } from "../../components";

export const Liked = () => {
    const { userDataState : { liked }} = useUserData();

    return (
        <CommonPage 
            itemList={liked}
            page="liked"
            title="Liked Videos"
        />
    );
}