export const getTrimmedTitleFunction = (title) => {
    if (title.length > 15) {
        return(`${title.substring(0, 15)}...`)
    }
    return(title);
}