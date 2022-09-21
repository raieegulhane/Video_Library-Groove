export const getTrimmedTitleFunction = (title) => {
    if (title.length > 18) {
        return(`${title.substring(0, 18)}...`)
    }
    return(title);
}