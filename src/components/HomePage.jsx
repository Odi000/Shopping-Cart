import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { getFetchRequest } from "../functions.js/fetchRequest";
import styles from "../css-modules/home-page.module.css"
import NavBar from "./navbar/NavBar";
import Button from "./button";
import Carousel from "./Carousel";
import Footer from "./Footer";


library.add(fas, far, fab);

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
        <div className={backBtnLocation === "/" ? styles.onHomePage : styles.homePage}>
            <NavBar cart={cart} favourites={favourites} filterByFav={filterByFav} setFilterByFav={setFilterByFav} changeLocation={changeLocation} />
            {(loaction.pathname !== "/") || (
                <>
                    <img className={styles.background} src="/assets/background-1.png"/>
                    <div className={styles.header}>
                        <h1>Shop Smart, Live Electric</h1>
                        <p>At ElectroMart, we bring you the best in electronics – from sleek smartphones to powerful laptops and smart home appliances. Enjoy fast delivery, great deals, and tech that fits your life. Start shopping today!</p>
                    </div>
                    <Link to="store" onClick={() => changeLocation("store")}><Button>Shop Now</Button></Link>
                    <Carousel products={products} loading={loading}></Carousel>
                </>
            )}
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
            <Footer backBtnLocation={backBtnLocation}></Footer>
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