import { sortByDateFunction, filterByCategoryFunction } from ".";

export const getFilteredAndSortedVideos = (videoList, operationState) => {
    const { 
        selectedCategory,
        sortOption
    } = operationState;

    const filteredVideos = filterByCategoryFunction(videoList, selectedCategory);
    const sortedVideos = sortByDateFunction(filteredVideos, sortOption);
    return(sortedVideos);
}