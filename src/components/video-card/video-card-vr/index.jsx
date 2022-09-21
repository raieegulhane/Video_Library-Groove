import "./video-card-vr.css";
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

    const shortViews = getShortenedViewsFunction(views);
    const editedTitle = getTrimmedTitleFunction(title);
    const clickH = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("button");
    }

    return(
        <div className="vc-vr-wr fx-c">
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
                    onClick={clickH}
                >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    );
}