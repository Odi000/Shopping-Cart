import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import styles from "../css-modules/product-container.module.css"

export default function ProductContainer({ productData, setCart }) {
    const [clickedHeart, setClickedHeart] = useState(false)
    const [amount, setAmount] = useState(1);

    function onPlusClick() {
        setAmount(amount + 1);
    }

    function onMinusClick() {
        if (amount === 1) return;
        setAmount(amount - 1);
    }

    function onHeartClick() {
        setClickedHeart(clicked => !clicked)
    }

    return (
        <div className={styles.productContainer}>
            <div className={styles.imgContainer}>
                <img src={productData.image} />
            </div>
            <div className={styles.info}>
                <h2 className={styles.name}>{productData.name}</h2>
                <p className={styles.category}>{productData.category}</p>
                <h2 >{"$" + productData.price}</h2>
            </div>
            <button className={clickedHeart ? styles.clicked : styles.addToFavourites} onClick={onHeartClick}>
                {clickedHeart ?
                    <FontAwesomeIcon icon="fa-solid fa-heart" style={{ color: "#d90808", }} /> :
                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                }
            </button>
            <div className={styles.addToCart}>
                <div className={styles.quantity}>
                    <button onClick={onMinusClick}><FontAwesomeIcon icon="fa-solid fa-minus" style={{ color: "#4A4A4A", }} /></button>
                    <div>{amount}</div>
                    <button onClick={onPlusClick}><FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#4A4A4A", }} /></button>
                </div>
                <AddToCart productData={productData} setCart={setCart} amount={amount} />
            </div>
        </div>
    )
}

function AddToCart({ productData, setCart, amount }) {

    function addProductToCartArray(cart) {
        let newCartArr = null;
        let totalAmount = amount;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productData.id) {
                totalAmount += cart[i].amount;
                newCartArr = cart.toSpliced(i, 1);
                break;
            }
        }

        if (newCartArr) {
            return [...newCartArr, { id: productData.id, amount: totalAmount }];
        }

        return [...cart, { id: productData.id, amount }]
    }

    return (
        <button className={styles.add} onClick={() => setCart(cart => addProductToCartArray(cart))}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cart-outline</title><path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" /></svg>
        </button>
    )
}