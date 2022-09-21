const initialVideoValues = {
    allVideos: [],
    allCategories: [],
    selectedCategory: "",
    // showSearched: false,
    // showClicked: false,
    // searchInput: "",
    // searchReccomendations: [],
    // searchResults: []

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
        // case "INIT_SEARCH":
        //     return ({
        //         ...state,
        //         showSearched: payload
        //     })

        // case "INIT_SELECT_RECCOMENDATION":
        //     return ({
        //         ...state,
        //         showSearched: payload
        //     });

        // case "SET_SEARCH_INPUT": 
        //     return ({
        //         ...state,
        //         searchInput: payload.toLowerCase()
        //     });

        // case "GET_SEARCH_RECOMMENDATIONS": 
        //     return ({
        //         ...state,
        //         searchReccomendations: [ ...productList ].filter (
        //             ({ title, author, genre }) => {
        //                 return (
        //                     title.toLowerCase().includes(searchInput) ||
        //                     author.toLowerCase().includes(searchInput) ||
        //                     genre.find((item) => item.includes(searchInput))
        //                 );
        //             } 
        //         )
        //     });

        // case "GET_SEARCH_RESULTS": 
        //     return ({
        //         ...state,
        //         searchResults: [ ...productList ].filter (
        //             ({ title, author, genre }) => {
        //                 return (
        //                     title.toLowerCase().includes(searchInput) ||
        //                     author.toLowerCase().includes(searchInput) ||
        //                     genre.find((item) => item.includes(searchInput))
        //                 );
        //             } 
        //         )
        //     });

        default:
            return({ ...initialVideoValues });
    }
}

export { initialVideoValues, videoReducerFunction };