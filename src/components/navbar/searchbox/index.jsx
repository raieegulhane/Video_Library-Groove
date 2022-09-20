import "./searchbox.css"

export const SearchBox = () => {
    return (
        <div className="sb-wr fx-r fx-js-sb fx-al-c">
            <input 
                className="inp-search"
                type="text"
                placeholder="Search..."
            />
            <button className="btn-icon btn-search">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    );
}