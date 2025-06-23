import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "../css-modules/home-page.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import NavBar from "./navbar/NavBar";
import Button from "./button";
import { getFetchRequest } from "../functions.js/fetchRequest";

library.add(fas, far, fab)

function HomePage() {
    const [cart, setCart] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [filterByFav, setFilterByFav] = useState(false);
    const { products, error, loading } = useProducts();
    const [backBtnLocation, setbackBtnLocation] = useState("/");
    const loaction = useLocation();

    function changeLocation(pathname) {
        setbackBtnLocation(pathname);
    }


    return (
        <div className={styles.homePage}>
            <NavBar cart={cart} favourites={favourites} filterByFav={filterByFav} setFilterByFav={setFilterByFav} changeLocation={changeLocation} />
            {loaction.pathname !== "/" || <Link to="store" onClick={() => changeLocation("store")}><Button>Shop Now</Button></Link>}
            <Outlet context={{
                products,
                error,
                loading,
                cart,
                setCart,
                favourites,
                setFavourites,
                filterByFav,
                backBtnLocation
            }} />
        </div>
    )
}

function useProducts() {
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts()

        async function fetchProducts() {
            try {
                const data = await getFetchRequest("/products.json");

                setProducts(data);
                setError(false);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    }, [])

    return { products, loading, error }
}


export default HomePage;