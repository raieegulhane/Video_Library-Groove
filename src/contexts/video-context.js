import { createContext, useContext, useReducer } from "react";
import { initialVideoValues, videoReducerFunction } from "../reducers";

const VideoContext = createContext(initialVideoValues);

const VideoProvider = ({ children }) => {
    const [ videoState, videoDispatch ] = useReducer(videoReducerFunction, initialVideoValues);

    return(
        <VideoContext.Provider value={{ videoState, videoDispatch }}>
            { children }
        </VideoContext.Provider>
    );
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider , useVideo };