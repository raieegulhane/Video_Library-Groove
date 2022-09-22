import "./video-card-vr.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useUserData } from "../../../contexts";
import { deleteHistoryVideoService, postHistoryService } from "../../../services";
import { getShortenedViewsFunction, getTrimmedTitleFunction } from "../../../utils";

export const VideoCardVr = ({ video, page}) => {
    const { authState: { authToken }} = useAuth();
    const { userDataDispatch } = useUserData();
    const {
        _id,
        title,
        views,
        uploadDate,
        channel,
        channelThumbnail
    } = video;
    const [showOptionBtns, setShowOptionBtns] = useState(false);
    const shortViews = getShortenedViewsFunction(views);
    const editedTitle = getTrimmedTitleFunction(title);

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
                            onClick={(e) => deleteVideoFromHistory(e)}
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
                        <button className="vc-vr-btn btn-icon">
                            <span className="vc-vr-btn-icon material-icons-outlined">queue_music</span>
                        </button>
                        <button className="vc-vr-btn btn-icon">
                            <span className="vc-vr-btn-icon material-icons-outlined">thumb_up</span>
                        </button>
                        <button className="vc-vr-btn btn-icon">
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