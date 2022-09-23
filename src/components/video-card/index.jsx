import "./video-card.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useOperation, useUserData } from "../../contexts";
import { deleteHistoryVideoService, deleteLikedService, deleteWatchLaterService, postHistoryService, postLikedService, postWatchLaterService } from "../../services";
import { getShortenedViewsFunction, getTrimmedTitleFunction } from "../../utils";

export const VideoCardVr = ({ video, page}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        _id,
        title,
        views,
        uploadDate,
        channel,
        channelThumbnail
    } = video;
    const { authState: { isAuth, authToken }} = useAuth();
    const { operationDispatch } = useOperation();
    const { userDataState, userDataDispatch } = useUserData();
    const { liked, watchLater } = userDataState;
    const [showOptionBtns, setShowOptionBtns] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [inWatchlater, setInWatchlater] = useState(false);
    const shortViews = getShortenedViewsFunction(views);
    const editedTitle = getTrimmedTitleFunction(title);

    useEffect(() => {
        liked.find((item) => item._id === _id) && setIsLiked(true);
        watchLater.find((item) => item._id === _id) && setInWatchlater(true);
    }, [_id]);

    const loginPromptHandler = () => {
        if (!isAuth) {
            toast.warning("Please login to continue");
            return navigate("/login", { state: { from: location.pathname } });
        }
    }

    const playlistHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginPromptHandler();
        operationDispatch({ type: "PLAYLIST_MODAL", payload: video });
    }

    const likeVideoHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginPromptHandler();

        try {
            const { data: { likes }} = await postLikedService(video, authToken);
            userDataDispatch({ type: "SET_LIKED", payload: likes });
            setIsLiked(true);
            toast.success("You liked a video");
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__LIKE_VIDEO: ", error);
        }
    }

    const unlikeVideoHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            const { data: { likes }} = await deleteLikedService(_id, authToken);
            userDataDispatch({ type: "SET_LIKED", payload: likes });
            setIsLiked(false);
            toast.info("You unliked a video");
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__UNLIKE_VIDEO: ", error);
        }
    }

    const addToWtachlaterHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginPromptHandler();

        try {
            const { data: { watchlater }} = await postWatchLaterService(video, authToken);
            userDataDispatch({ type: "SET_WATCHLATER", payload: watchlater });
            setInWatchlater(true);
            toast.success("Video added to watch later");
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__ADD_TO_WATCHLATER: ", error);
        }
    }

    const removeFromWathclaterHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const { data: { watchlater }} = await deleteWatchLaterService(_id, authToken);
            userDataDispatch({ type: "SET_WATCHLATER", payload: watchlater });
            setInWatchlater(false);
            toast.info("Video removed from watch later");
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__REMOVE_FROM_WATCHLATER: ", error);
        }
    }

    const addToHistoryHandler = async () => {
        try {
            const { data: { history }} = await postHistoryService(video, authToken);
            userDataDispatch({ type: "SET_HISTORY", payload: history });
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__ADD_TO_HISTORY: ", error);
        }
    }

    const deleteVideoFromHistory = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        try {
            const { data: { history }} = await deleteHistoryVideoService(_id, authToken);
            userDataDispatch({ type: "SET_HISTORY", payload: history });
            toast.info("Video deleted from history")
        } catch (error) {
            console.log("ERROR__VIDEO_CARD__DELETE_FROM_HISTORY: ", error);
        }
    }
    
    return(
        <Link
            to={`/video/${_id}`} 
            onClick={addToHistoryHandler}
            className="link-noDecoration"
        >
            <div
                className="vc-vr-wr fx-c"
                onMouseOver={() => setShowOptionBtns(true)}
                onMouseOut={() => setShowOptionBtns(false)}
            >
                <img 
                    src={`https://i.ytimg.com/vi/${_id}/mqdefault.jpg`}
                    alt={`${title} thumbnail`}
                />
                <div className="fx-r fx-js-sb">
                    <div className="vc-vr-cn fx-r">
                        <img 
                            className="img-channel"
                            src={channelThumbnail}
                            alt={`${channel} thumbnail`}
                        />
                        <div>
                            <h2 className="vc-title">{editedTitle}</h2>
                            <p className="vc-txt txt-sm">{channel}</p>
                            <p className="vc-txt txt-sm"><span>{shortViews}</span> • <span>{uploadDate}</span></p>
                        </div>
                    </div>
                    <div className="fx-r fx-al-s">
                    {
                        page==="history" &&
                        <button 
                            className="btn-icon"
                            onClick={deleteVideoFromHistory}
                        >
                            <i className="vc-del-btn-icon fa-solid fa-trash"></i>
                        </button>
                    }
                        <button className="btn-icon">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                    </div>
                </div>
                {
                    <div className={`vc-vr-btn-cn fx-c ${showOptionBtns && "vc-btn-cn-visible"}`}>
                        <button 
                            className="vc-vr-btn btn-icon"
                            onClick={playlistHandler}
                        >
                            <span className="vc-vr-btn-icon material-icons-outlined">queue_music</span>
                        </button>
                        <button 
                            className={`vc-vr-btn ${isLiked && "vc-vr-btn-selected"} btn-icon`}
                            onClick={isLiked ? unlikeVideoHandler : likeVideoHandler}
                        >
                            <span className="vc-vr-btn-icon material-icons-outlined">thumb_up</span>
                        </button>
                        <button 
                            className={`vc-vr-btn ${inWatchlater && "vc-vr-btn-selected"} btn-icon`}
                            onClick={inWatchlater ? removeFromWathclaterHandler : addToWtachlaterHandler}    
                        >
                            <span className="vc-vr-btn-icon material-icons-outlined">watch_later</span>
                        </button>
                        <button className="vc-vr-btn btn-icon">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                    </div>
                }
            </div>
        </Link>
    );
}