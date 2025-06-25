import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductContainer from "./ProductConteiner";
import styles from "../css-modules/store.module.css";

function SideBar({ products, selectedCategory, setSelectedCategory }) {
    let categories = [];

    products.forEach(prod => {
        if (categories.includes(prod.category)) return;
        categories.push(prod.category)
    })

    function onClickCategory(category) {
        setSelectedCategory(selectedCategory => {
            if (selectedCategory === category) return null;
            return category;
        });
    }

    return (
        <div className={styles.sideBar}>
            <h2>Categories</h2>
            <div className={styles.categories}>
                {categories.map(category => {
                    return (
                        <div key={category} onClick={() => onClickCategory(category)}>
                            <span className={category === selectedCategory ? styles.clicked : null}>
                                <svg viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path></svg>
                            </span>
                            <p>{/home/i.test(category) ? category : category + "s"}</p>
                        </div>)
                })}
            </div>
        </div>
    )
}

function Store() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const { products, error, loading, setCart, favourites, setFavourites, filterByFav } = useOutletContext();

    if (loading) return <h1>Loading..</h1>

    const filteredProducts = products.filter(prod => {
        if (filterByFav && selectedCategory) {
            return favourites.includes(prod.id) && prod.category === selectedCategory;
        }
        if (filterByFav) return favourites.includes(prod.id)
        if (selectedCategory) return prod.category === selectedCategory;
    });

    return (
        <div className={styles.container}>
            <SideBar
                products={products}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <div>
                <h2 className={filterByFav ? styles.favFilter : null}>Items ({selectedCategory || filterByFav ? filteredProducts.length : products.length})</h2>
                <div className={styles.productsDisplayer}>
                    {selectedCategory || filterByFav ?
                        filteredProducts.map(prod => <ProductContainer key={prod.id} productData={prod} setCart={setCart} favourites={favourites} setFavourites={setFavourites} />) :
                        products.map(prod => <ProductContainer key={prod.id} productData={prod} setCart={setCart} favourites={favourites} setFavourites={setFavourites} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Store