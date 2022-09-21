const initialVideoValues = {

}

const videoReducerFunction = (state, { type, payload }) => {
    switch (type) {
        default:
            return({ ...initialVideoValues });
    }
}

export { initialVideoValues, videoReducerFunction };