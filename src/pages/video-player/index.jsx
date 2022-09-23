import "./video-player.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player/youtube'
import { toast } from "react-toastify";
import { deleteLikedService, deleteWatchLaterService, getVideoByIdService, postLikedService, postWatchLaterService } from "../../services";
import { getShortenedViewsFunction } from "../../utils";
import { useAuth, useOperation, useUserData } from "../../contexts";

export const VideoPlayer = () => {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const { authState: { isAuth, authToken }} = useAuth();
    const { operationDispatch } = useOperation();
    const { userDataState, userDataDispatch } = useUserData();
    const { liked, watchLater } = userDataState;
    const [currentVideo, setCurrentVideo] = useState({});
    const {
        _id,
        title,
        description,
        views,
        uploadDate,
        category,
        channel,
        channelThumbnail
    } = currentVideo;
    const editedViews = getShortenedViewsFunction(views);
    const [isLiked, setIsLiked] = useState(false);
    const [inWatchlater, setInWatchlater] = useState(false);

    useEffect (() => {
        fetchCurrentVideo()
    }, [videoId]);

    useEffect(() => {
        liked.find((item) => item._id === _id) && setIsLiked(true);
        watchLater.find((item) => item._id === _id) && setInWatchlater(true);
        
    }, [_id]);

    const loginPromptHandler = () => {
        if (!isAuth) {
            toast.warning("Please login to continue");
            return navigate("/login", { state: { from: `/video/${videoId}` } });
        }
    }
    
    const fetchCurrentVideo = async () => {
        try {
            const { data: { video }} = await getVideoByIdService(videoId);
            setCurrentVideo({ ...video });
        } catch (error) {
            console.log("ERROR__VIDEO_PLAYER: ", error);
            toast.error("Problem occured while loading video details.")
        }
    }

    const likeVideoHandler = async () => {
        loginPromptHandler();

        try {
            const { data: { likes }} = await postLikedService(currentVideo, authToken);
            userDataDispatch({ type: "SET_LIKED", payload: likes });
            setIsLiked(true);
            toast.success("You liked a video");
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__LIKE_VIDEO: ", error);
        }
    }

    const unlikeVideoHandler = async () => {
        try {
            const { data: { likes }} = await deleteLikedService(_id, authToken);
            userDataDispatch({ type: "SET_LIKED", payload: likes });
            setIsLiked(false);
            toast.info("You unliked a video");
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__LIKE_VIDEO: ", error);
        }
    }

    const playlistHandler = () => {
        loginPromptHandler();
        operationDispatch({ type: "PLAYLIST_MODAL" });
    }

    const addToWtachlaterHandler = async () => {
        loginPromptHandler();

        try {
            const { data: { watchlater }} = await postWatchLaterService(currentVideo, authToken);
            userDataDispatch({ type: "SET_WATCHLATER", payload: watchlater });
            setInWatchlater(true);
            toast.success("Video added to watch later");
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__ADD_TO_WATCHLATER: ", error);
        }
    }

    const removeFromWathclaterHandler = async () => {
        try {
            const { data: { watchlater }} = await deleteWatchLaterService(_id, authToken);
            userDataDispatch({ type: "SET_WATCHLATER", payload: watchlater });
            setInWatchlater(false);
            toast.info("Video removed from watch later");
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__REMOVE_FROM_WATCHLATER: ", error);
        }
    }

    return (
        <div className="vp-wr">
            <div className="vp-yt-cn">
                <ReactPlayer 
                    url={`https://www.youtube.com/watch?v=${_id}`}
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={true}
                />
            </div>
            <div className="vp-cn fx-r fx-js-sb">
                <div className="vp-info-cn fx-c">
                    <div>
                        <h2>{title}</h2>
                        <p className="txt-bold">{description}</p>
                    </div>
                    <div className="fx-r gap-1">
                        <img 
                            className="vp-channel-thumbnail"
                            src={channelThumbnail}
                            alt={`${channel} thumbnail`}
                        />
                        <div>
                            <p>{channel}</p>
                            <p className="vp-info-txt txt-sm"><span>{editedViews} views</span> • <span>{uploadDate}</span></p>
                            <p className="vp-info-txt txt-sm">Category: {category}</p>
                        </div>
                    </div>
                </div>
                <div className="vp-btn-cn fx-r">
                    <button 
                        className={`vp-btn ${isLiked && "vp-btn-selected"} fx-c fx-al-c`}
                        onClick={isLiked ? unlikeVideoHandler : likeVideoHandler}
                    >
                        <span className="vp-btn-icon material-icons-outlined">thumb_up</span>
                        <span className="txt-sm">{isLiked? "Unlike" : "Like"} Video</span>
                    </button>
                    <button 
                        className="vp-btn fx-c fx-al-c"
                        onClick={playlistHandler}
                    >
                        <span className="vp-btn-icon material-icons-outlined">queue_music</span>
                        <span className="txt-sm">Add to Playlist</span>
                    </button>
                    <button 
                        className={`vp-btn ${inWatchlater && "vp-btn-selected"} fx-c fx-al-c`}
                        onClick={inWatchlater ? removeFromWathclaterHandler : addToWtachlaterHandler}
                    >
                        <span className="vp-btn-icon material-icons-outlined">watch_later</span>
                        <span className="txt-sm">Watch Later</span>
                    </button>
                </div>
            </div>
        </div>
    );
}