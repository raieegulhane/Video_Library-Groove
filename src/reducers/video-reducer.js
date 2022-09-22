const initialVideoValues = {
    allVideos: [],
    allCategories: []
}

const videoReducerFunction = (state, { type, payload }) => {
    switch (type) {
        case "FETCH_VIDEOS": 
            return ({
                ...state,
                allVideos: [ ...payload ]
            });

        case "FETCH_CATEGORIES": 
            return ({
                ...state,
                allCategories: [ ...payload ]
            });

        default:
            return({ ...initialVideoValues });
    }
}

export { initialVideoValues, videoReducerFunction };