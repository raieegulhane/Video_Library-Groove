export const filterByCategoryFunction = (videoList, selectedCtegory) => {
    switch (selectedCtegory) {
        case "":
            return([ ...videoList ]);

        case "Rock":
            return([ ...videoList ].filter(({ category }) => category === "Rock"));
            
        case "K-Pop":
            return([ ...videoList ].filter(({ category }) => category === "K-Pop"));

        case "Classical":
            return([ ...videoList ].filter(({ category }) => category === "Classical"));

        case "Indie":
            return([ ...videoList ].filter(({ category }) => category === "Indie"));

        case "Party":
            return([ ...videoList ].filter(({ category }) => category === "Party"));

        case "Hip-hop":
            return([ ...videoList ].filter(({ category }) => category === "Hip-hop"));

        case "Bollywood":
            return([ ...videoList ].filter(({ category }) => category === "Bollywood"));

        case "Electronic":
            return([ ...videoList ].filter(({ category }) => category === "Electronic"));

        case "Pop":
            return([ ...videoList ].filter(({ category }) => category === "Pop"));
    }
}