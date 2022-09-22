import "./video-card-vr.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getShortenedViewsFunction, getTrimmedTitleFunction } from "../../../utils";

export const VideoCardVr = ({ video }) => {
    const {
        _id,
        title,
        views,
        uploadDate,
        channel,
        channelThumbnail
    } = video;
    const [showOptionBtns, setShowOptionBtn] = useState(false);
    const shortViews = getShortenedViewsFunction(views);
    const editedTitle = getTrimmedTitleFunction(title);
    
    return(
        <Link
            to={`/video/${_id}`} 
            onMouseOver={() => setShowOptionBtn(true)}
            onMouseOut={() => setShowOptionBtn(false)}
            className="vc-vr-wr fx-c link-noDecoration"
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
                <button 
                    className="btn-icon"
                >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
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
        </Link>
    );
}