const initialOperationValues = {
    selectedCategory: "",
    sortOption: "",
    showSortDropdown: ""
}

const operationsReducerFunction = (state, { type, payload }) => {
    const { showSortDropdown } = state;
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

        default:
            return(initialOperationValues);
    }
}

export { initialOperationValues, operationsReducerFunction };