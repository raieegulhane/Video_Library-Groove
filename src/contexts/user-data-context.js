import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { initialUserDataValues, userDataReducerFunction } from "../reducers";
import { getHistoryService } from "../services";

const UserDataContext = createContext(initialUserDataValues);

const UserDataProvider = ({ children }) => {
    const [userDataState, userDataDispatch] = useReducer(userDataReducerFunction, initialUserDataValues);

    useEffect (() => {
        (async () => {
            try {
                // const fetchAllPlaylistsResponse = await getHistoryService();
                // userDataDispatch({ type: "SET_HISTORY", payload: fetchHistoryResponse.data.videos});

                // const fetchLikedResponse = await getHistoryService();
                // userDataDispatch({ type: "SET_HISTORY", payload: fetchHistoryResponse.data.videos});

                // const fetchWatchLaterResponse = await getHistoryService();
                // userDataDispatch({ type: "SET_HISTORY", payload: fetchHistoryResponse.data.videos});

                const fetchHistoryResponse = await getHistoryService();
                userDataDispatch({ type: "SET_HISTORY", payload: fetchHistoryResponse.data.videos});
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