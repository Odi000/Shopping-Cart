import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import styles from "../../css-modules/navbar.module.css";

function NavBar({cart}) {
    return (
        <nav className={styles.navBar}>
            <div className={styles.left}>
                <img src="src/assets/logos/logo-9.png"/>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="store" >Store</Link>
                </div>
            </div>
            <div className={styles.right}>
                <SearchBar></SearchBar>
                <div className={styles.heartNCart}>
                    <Link className={styles.heart}>
                        <FavoutiesIcon favoutiesTotal={15}></FavoutiesIcon>
                    </Link>
                    <Link className={styles.cart}>
                        <ShoppingCartIcon shoppingCartTotal={cart.length}></ShoppingCartIcon>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

function FavoutiesIcon({ favoutiesTotal }) {
    return (
        <div>
            <FontAwesomeIcon icon="fa-regular fa-heart" />
            <p>{favoutiesTotal}</p>
        </div>
    )
}

function ShoppingCartIcon({ shoppingCartTotal }) {
    return (
        <div>
            <svg viewBox="0 -960 960 960"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"></path></svg>
            <p>{shoppingCartTotal}</p>
        </div>
    )
}

export default NavBar;