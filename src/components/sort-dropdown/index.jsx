import "./sort-dropdown.css";
import { useOperation } from "../../contexts";

export const SortDropdown = () => {
    const { operationState: { sortOption }, operationDispatch } = useOperation();

    return(
        <div className="sort-dd-wr fx-c">
            <div className="sort-dd-cn">
                <button 
                    className="btn-icon sort-dd-close-btn"
                    onClick={() => operationDispatch({ type: "SORT_DROPDOWN" })}
                >
                    <i class="dd-close-icon material-icons-outlined">close</i>
                </button>
                <label 
                    className="sort-dd-label fx-r"
                    htmlFor="newest-first"
                >
                    <input
                        id="newest-first"
                        className="sort-dd-inp" 
                        type="radio"
                        name="sort"
                        value="newest-first" 
                        checked={ sortOption === "NEWEST_FIRST" }
                        onChange={() => operationDispatch({ type: "SET_SORT_OPTION", payload: "NEWEST_FIRST"})}
                    />
                    Newest first
                </label>
                <label 
                    className="sort-dd-label fx-r"
                    htmlFor="oldest-first"
                >
                    <input
                        id="oldest-first"
                        className="sort-dd-inp" 
                        type="radio"
                        name="sort"  
                        value="oldest-first"
                        checked={ sortOption === "OLDEST_FIRST" }
                        onChange={() => operationDispatch({ type: "SET_SORT_OPTION", payload: "OLDEST_FIRST"})}
                    />
                    Oldest first
                </label>
            </div>
            <button 
                className="clr-sort-btn btn-link"
                onClick={() => operationDispatch({ type: "SET_SORT_OPTION", payload: "" })}
            >
                clear sort
            </button>
        </div>
    );
}