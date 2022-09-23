const initialOperationValues = {
    selectedCategory: "",
    sortOption: "",
    showSortDropdown: "",
    playlistModal: {
        showPlaylistModal: false,
        currentVideo: {}
    },
}

const operationsReducerFunction = (state, { type, payload }) => {
    const { showSortDropdown, playlistModal } = state;
    const { showPlaylistModal } = playlistModal;

    switch (type) {
        case "SET_SELECTED_CATEGORY":
            return(
                {
                    ...state,
                    selectedCategory: payload
                }
            );

        case "SET_SORT_OPTION":
            return(
                {
                    ...state,
                    sortOption: payload
                }
            );

        case "SORT_DROPDOWN": 
            return(
                {
                    ...state,
                    showSortDropdown: !showSortDropdown
                }
            );

        case "PLAYLIST_MODAL":
            return(
                {
                    ...state,
                    playlistModal: {
                        ...playlistModal,
                        showPlaylistModal: !showPlaylistModal,
                        currentVideo: { ...payload }
                    }
                }
            )

        default:
            return(initialOperationValues);
    }
}

export { initialOperationValues, operationsReducerFunction };