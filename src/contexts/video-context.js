import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { initialVideoValues, videoReducerFunction } from "../reducers";
import { getAllVideosService } from "../services";

const VideoContext = createContext(initialVideoValues);

const VideoProvider = ({ children }) => {
    const [ videoState, videoDispatch ] = useReducer(videoReducerFunction, initialVideoValues);

    useEffect (() => {
        (async () => {
            try {
                const response = await getAllVideosService();
                videoDispatch({ type: "FETCH_VIDEO", payload: response.data.videos})
            } catch (error) {
                console.log("VIDEO_CONTEXT__FETH VIDEOS_ERROR: ", error)
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