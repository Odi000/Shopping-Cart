import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBar() {
    return (
        <div className="searchBar">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Search" />
        </div>
    )
}

export default SearchBar;