import { useVideo, useOperation } from "../../contexts";

export const CategoryList = () => {
    const { videoState: { allCategories } } = useVideo();
    const { operationState: { selectedCategory }, operationDispatch } = useOperation();

    return(
        <div className="ctg-list-wr fx-r fx-wrap gap-1">
            <button 
                className={`btn btn-cr ${selectedCategory ? "btn-outline" : "btn-primary"}`}
                onClick={() => operationDispatch({ type: "SET_SELECTED_CATEGORY", payload: "" })}
            >
                All
            </button>
            {
                allCategories.map(({_id, categoryName}) => {
                    return(
                        <button 
                            className={`btn btn-cr ${selectedCategory === categoryName ? "btn-primary" : "btn-outline" }`}
                            onClick={() => operationDispatch({ type: "SET_SELECTED_CATEGORY", payload: categoryName })}
                            key={_id}
                        >
                            {categoryName}
                        </button>  
                    );
                })
            }
        </div>
    );
}