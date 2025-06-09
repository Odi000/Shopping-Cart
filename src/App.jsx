import { use, useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import { getFetchRequest } from "./functions.js/fetchRequest";
import ProductContainer from "./components/ProductConteiner";

function App() {
    const { products, error, loading } = useProducts();

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{`a a: ${error}`}</h1>

    // console.log(products)


    return (
        <>
            <HomePage>
                {loading || <img src={products.laptops[5].image} />}
            </HomePage>
            <ProductContainer productData={products}></ProductContainer>
        </>
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

export default App