// auth services
export { signupService } from "./auth-services/signup-service";
export { loginService } from "./auth-services/login-service";

// video services
export { getAllVideosService } from "./video-services/get-all-videos-service";
export { getVideoByIdService } from "./video-services/get-video-by-id-service";

// category services 
export { getCategoriesService } from "./category-services/get-category-service";
export { getCategoryByIdService } from "./category-services/get-category-by-id-service";

// playlist services
export { getPlaylistService } from "./playlist-services/get-playlist-service";
export { postPlaylistService } from "./playlist-services/post-playlist-service";
export { deletePlaylistService } from "./playlist-services/delete-playlist-service";
export { getPlaylistVideosService } from "./playlist-services/get-playlist-video-service";
export { postPlaylistVideoService } from "./playlist-services/post-playlist-video-service";
export { deletePlaylistVideoService } from "./playlist-services/delete-playlist-video-service";

// likes services
export { getLikedService } from "./likes-services/get-liked-service";
export { postLikedService } from "./likes-services/post-liked-service";
export { deleteLikedService } from "./likes-services/delete-liked-service";

// watch later services
export { getWatchLaterService } from "./watch-later-services/get-watch-later-service";
export { postWatchLaterService } from "./watch-later-services/post-watch-later-service";
export { deleteWatchLaterService } from "./watch-later-services/delete-watch-later-service";

// history services
export { getHistoryService } from "./history-services"
export { postHistoryService } from "./history-services"
export { deleteHistoryVideoService } from "./history-services"
export { deleteHistoryService } from "./history-services"