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
    const { products, error, loading } = useProducts();
    const loaction = useLocation();

    console.log(cart)

    return (
        <div className={styles.homePage}>
            <NavBar cart={cart}/>
            {loaction.pathname !== "/" || <Link to="store"><Button>Shop Now</Button></Link>}
            <Outlet context={{ products, error, loading, setCart }} />
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