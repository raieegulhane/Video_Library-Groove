export const sortByDateFunction = (videoList, sortOption) => {
    switch (sortOption) {
        case false:
            return([ ...videoList ]);

        case "NEWEST_FIRST": 
            return([ ...videoList ].sort((video1, video2) => new Date(video2.uploadDate) - new Date(video1.uploadDate)));

        case "OLDEST_FIRST":
            return([ ...videoList ].sort((video1, video2) => new Date(video1.uploadDate) - new Date(video2.uploadDate)));

        default:
            return([ ...videoList ]);
    }
}