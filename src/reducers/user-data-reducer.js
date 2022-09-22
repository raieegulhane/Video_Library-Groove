const initialUserDataValues = {
    allPlaylists: [],
    liked: [],
    watchLater: [],
    history: []
}

const userDataReducerFunction = (state, { type, payload }) => {
    switch (type) {
        case "SET_PLAYLIST_LIST":
            return(
                {
                    ...state,
                    allPlaylists: [ ...payload ]
                }
            );
            
        case "SET_LIKED":
            return(
                {
                    ...state,
                    liked: [ ...payload ]
                }
            );

        case "SET_WATCHLATER":
            return(
                {
                    ...state,
                    watchLater: [ ...payload ]
                }
            );

        case "SET_HISTORY":
            return(
                {
                    ...state,
                    history: [ ...payload ]
                }
            );
        default:
            return({ ...initialUserDataValues });
    }
} 

export { initialUserDataValues, userDataReducerFunction };