import { CommonPage } from "../../components";
import { useUserData } from "../../contexts";

export const Playlist = () => {
    const { userDataState: { allPlaylists }} = useUserData();
    return (
        <div>
            <CommonPage 
                itemList={allPlaylists}
                page="playlist"
                title="Playlist"
            />
        </div>
    );
}