export default function ProductContainer({productData}){
    console.log(productData)
    return (
        <div className="container">
            <img src={productData.laptops[0].image}/>
            <h2 className="name">{productData.laptops[0].name}</h2>
            <p className="category">{productData.laptops[0].category}</p>
            <h2 className="price">{productData.laptops[0].price}</h2>
            <button className="addToFavourites"></button>
            <button className="addToCart"></button>
            {/*add quantity code somewhere here*/}
        </div>
    )
}