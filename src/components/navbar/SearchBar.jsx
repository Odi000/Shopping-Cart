import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBar() {
    return (
        <div>
            <input type="text" placeholder="Search" />
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div>
    )
}

export default SearchBar;