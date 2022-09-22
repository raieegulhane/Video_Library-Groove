import "./video-player.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from 'react-player/youtube'
import { toast } from "react-toastify";
import { getVideoByIdService } from "../../services";
import { getShortenedViewsFunction } from "../../utils";

export const VideoPlayer = () => {
    const navigate = useNavigate();
    const { videoId } = useParams();
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
    
    const fetchCurrentVideo = async () => {
        try {
            const { data: { video }} = await getVideoByIdService(videoId);
            setCurrentVideo({ ...video });
        } catch (error) {
            console.log("ERROR__VIDEO_PLAYER: ", error);
            toast.error("Problem occured while loading video details.")
        }
    }

    useEffect (() => {
        fetchCurrentVideo()
    }, [videoId]);

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
                    <button className="vp-btn fx-c fx-al-c">
                        <span class="vp-btn-icon material-icons-outlined">thumb_up</span>
                        <span className="txt-sm">Like Video</span>
                    </button>
                    <button className="vp-btn fx-c fx-al-c">
                        <span class="vp-btn-icon material-icons-outlined">queue_music</span>
                        <span className="txt-sm">Add to Playlist</span>
                    </button>
                    <button className="vp-btn fx-c fx-al-c">
                        <span class="vp-btn-icon material-icons-outlined">watch_later</span>
                        <span className="txt-sm">Watch Later</span>
                    </button>
                </div>

            </div>
           
          
        </div>
    );
}