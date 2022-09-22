import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { initialVideoValues, videoReducerFunction } from "../reducers";
import { getAllVideosService, getCategoriesService } from "../services";

const VideoContext = createContext(initialVideoValues);

const VideoProvider = ({ children }) => {
    const [ videoState, videoDispatch ] = useReducer(videoReducerFunction, initialVideoValues);

    useEffect (() => {
        (async () => {
            try {
                const response1 = await getAllVideosService();
                videoDispatch({ type: "FETCH_VIDEOS", payload: response1.data.videos});

                const response2 = await getCategoriesService();
                videoDispatch({ type: "FETCH_CATEGORIES", payload: response2.data.categories});
            } catch (error) {
                console.log("VIDEO_CONTEXT__FETCH_DATA_ERROR: ", error)
                toast.error("Error occured while fetching videos.");
            }
        }) ();
    }, []);

    return(
        <VideoContext.Provider value={{ videoState, videoDispatch }}>
            { children }
        </VideoContext.Provider>
    );
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider , useVideo };