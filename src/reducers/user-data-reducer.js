const initialUserDataValues = {
    allPlaylists: [],
    liked: [],
    watchLater: [],
    history: []
}

const userDataReducerFunction = (state, { type, payload }) => {
    const { allPlaylists } = state;

    switch (type) {
        case "SET_PLAYLISTS":
            console.log(payload)
            return(
                {
                    ...state,
                    allPlaylists: [ ...payload ]
                }
            );

        case "UPDATE_PLAYLIST":
            return(
                {
                    ...state,
                    allPlaylists: [ ...allPlaylists ].map((exPlaylists) => 
                        exPlaylists._id === payload._id ?
                        { ...payload } : 
                        { ...exPlaylists }
                    )
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