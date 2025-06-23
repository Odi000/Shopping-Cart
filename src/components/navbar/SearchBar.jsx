import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../css-modules/search-bar.module.css"

function SearchBar() {
    return (
        <div className={styles.searchBar}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Search" />
        </div>
    )
}

export default SearchBar;