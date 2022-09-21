import "./video-card-vr.css";
import { getShortenedViewsFunction, getTrimmedTitleFunction } from "../../../utils";

export const VideoCardVr = () => {
    const video = {
        _id: "iEJPDYrLtsI",
        title: "Ishq Shava",
        description: "Full Song | Jab Tak Hai Jaan | Shah Rukh Khan, Katrina | A R Rahman, Gulzar, Shilpa Rao",
        views: "99875023",
        uploadDate: "Jan 5, 2013",
        category: "Hip-hop",
        channel: "YRF",
        channelThumbnail: "https://yt3.ggpht.com/b42QCAmVJ0kzNNi10_HmhsdfPEATQATS80hbLyHVJcVm6drn5pKtC6MY6wTluXi5iZ8_is5Q_Q=s48-c-k-c0x00ffffff-no-rj"
    }
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