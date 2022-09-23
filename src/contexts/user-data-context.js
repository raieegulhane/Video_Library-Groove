import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from ".";
import { initialUserDataValues, userDataReducerFunction } from "../reducers";
import { getHistoryService, getLikedService, getPlaylistService, getWatchLaterService } from "../services";

const UserDataContext = createContext(initialUserDataValues);

const UserDataProvider = ({ children }) => {
    const { authState: { authToken } } = useAuth();
    const [userDataState, userDataDispatch] = useReducer(userDataReducerFunction, initialUserDataValues);

    useEffect (() => {
        (async () => {
            try {
                const { data: { playlists }} = await getPlaylistService(authToken);
                userDataDispatch({ type: "SET_PLAYLISTS", payload: playlists });

                const { data: { likes }} = await getLikedService(authToken);
                userDataDispatch({ type: "SET_LIKED", payload: likes});

                const { data: { watchlater }} = await getWatchLaterService(authToken);
                userDataDispatch({ type: "SET_WATCHLATER", payload: watchlater});

                const { data: { history }} = await getHistoryService(authToken);
                userDataDispatch({ type: "SET_HISTORY", payload: history});
            } catch (error) {
                console.log("USER_DATA_CONTEXT__FETCH_DATA_ERROR: ", error)
                toast.error("Error occured while fetching videos.");
            }
        }) ();
    }, [])

    return(
        <UserDataContext.Provider value={{ userDataState, userDataDispatch }}>
            { children }
        </UserDataContext.Provider>
    );
}

const useUserData = () => useContext(UserDataContext);

export { UserDataProvider, useUserData };