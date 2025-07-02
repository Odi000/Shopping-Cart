import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import styles from "../../css-modules/navbar.module.css";

function NavBar({ cart, favourites, filterByFav, setFilterByFav, changeLocation }) {
    function onHeartClick(turnOff) {
        if (turnOff) {
            setFilterByFav(false);
            return;
        }
        setFilterByFav(state => !state)
    }

    return (
        <nav className={styles.navBar}>
            <div className={styles.left}>
                <Link to="/" onClick={() => { changeLocation("/"); onHeartClick(true) }}>
                    <picture>
                        <source srcSet="/assets/logos/logo-10.png" media="(max-width: 800px)" />
                        <img src="/assets/logos/logo-9.png" />
                    </picture>
                </Link>
                <div>
                    <Link className={styles.home} to="/" onClick={() => { changeLocation("/"); onHeartClick(true) }}>Home</Link>
                    <Link className={styles.store} to="store" onClick={() => { changeLocation("store"), onHeartClick(true) }} >Store</Link>
                </div>
            </div>
            <div className={styles.right}>
                <SearchBar></SearchBar>
                <div className={styles.heartNCart}>
                    <Link to="store" className={styles.heart} onClick={() => { changeLocation("store"), onHeartClick() }}>
                        <FavoutiesIcon favoutiesTotal={favourites.length} filterByFav={filterByFav}></FavoutiesIcon>
                    </Link>
                    <Link to={"cart"} className={styles.cart} onClick={() => { changeLocation("cart"), onHeartClick(true) }}>
                        <ShoppingCartIcon cart={cart}></ShoppingCartIcon>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

function FavoutiesIcon({ favoutiesTotal, filterByFav }) {
    return (
        <div>
            {filterByFav ?
                <FontAwesomeIcon icon="fa-solid fa-heart" /> :
                <FontAwesomeIcon icon="fa-regular fa-heart" />
            }
            <p>{favoutiesTotal}</p>
        </div>
    )
}

function ShoppingCartIcon({ cart }) {
    const totalItems = cart.reduce((accumulator, product) => {
        return accumulator + 1 * product.amount;
    }, 0);

    return (
        <div>
            <svg viewBox="0 -960 960 960"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"></path></svg>
            <p>{totalItems}</p>
        </div>
    )
}

export default NavBar;