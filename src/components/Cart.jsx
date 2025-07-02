import { useOutletContext, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../css-modules/cart.module.css"
import { useState, useEffect } from "react";

export default function Cart() {
    const { products, cart, setCart, backBtnLocation, changeLocation } = useOutletContext();
    const productsInCart = filterOutProductsInCart(cart, products);


    return (
        <div className={styles.container}>
            <div className={styles.cartElements}>
                <Link to={"../" + backBtnLocation.previous} onClick={() => changeLocation(backBtnLocation.previous)}>
                    <button className={styles.back}>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    </button>
                </Link>
                <h2>Shopping Cart</h2>
                <div className={styles.elements}>
                    {productsInCart.length === 0 ?
                        <h2>Your cart is empty</h2> :
                        productsInCart.map(product => <CartElement key={product.id} element={product} cart={cart} setCart={setCart} />)
                    }
                </div>
            </div>
            <OrderSummary setCart={setCart} productsInCart={productsInCart} />
        </div>
    )
}

function CartElement({ element, cart, setCart }) {

    function changeProductQuantity(operand) {
        const clonedCart = JSON.parse(JSON.stringify(cart));
        const elToChange = clonedCart.find(el => el.id === element.id);

        if (operand === "+") elToChange.amount += 1;

        else {
            if (elToChange.amount <= 1) {
                const index = clonedCart.findIndex(el => elToChange.id === el.id)
                clonedCart.splice(index, 1);
            } else elToChange.amount -= 1;
        }

        setCart(clonedCart);
    }

    function removeFromCart(product) {
        const clonedCart = JSON.parse(JSON.stringify(cart));
        const index = clonedCart.findIndex(el => product.id === el.id)
        clonedCart.splice(index, 1);
        setCart(clonedCart);
    }

    return (
        <div className={styles.element}>
            <div className={styles.left}>
                <div className={styles.image}><img src={element.image} /></div>
                <div className={styles.infoAndAdjust}>
                    <div className={styles.info}>
                        <h3 className={styles.name}>{element.name}</h3>
                        <p className={styles.category}>{element.category}</p>
                        <p className={styles.stock}>
                            <svg viewBox="0 -960 960 960"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"></path> </svg>
                            In Stock
                        </p>
                        <p className={styles.quantity}>Qty: {element.quantity}</p>
                    </div>
                    <div className={styles.adjustQty}>
                        <button className={styles.minus} onClick={() => changeProductQuantity("-")}>
                            <FontAwesomeIcon icon="fa-solid fa-minus" style={{ color: "#a3a3a3", }} />
                        </button>
                        <p className={styles.qty}>{element.quantity}</p>
                        <button className={styles.plus} onClick={() => changeProductQuantity("+")}>
                            <FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#a3a3a3", }} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.total}>
                    <button className={styles.delete} onClick={() => removeFromCart(element)}><svg viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"></path> </svg></button>
                    <p className={styles.total}>${element.price * element.quantity}.0</p>
                </div>
            </div>
        </div>
    )
}

function OrderSummary({ productsInCart, setCart }) {

    const totalItems = productsInCart.reduce((accumulator, product) => {
        return accumulator + 1 * product.quantity
    }, 0)
    const sum = productsInCart.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
    }, 0);

    let preVAT = sum * .8;
    if (preVAT % 1) preVAT = Math.floor(preVAT) + .5;



    return (
        <div className={styles.summary}>
            <h2 className={styles.title}>Order Summary</h2>
            <h2 className={styles.sum}>${sum}.0</h2>
            <div className={styles.subtotal}>
                <p>Subtotal ({totalItems} items)</p>
                <p>${preVAT}</p>
            </div>
            <div className={styles.subtotal}>
                <p>VAT (20%)</p>
                <p>${sum - preVAT}</p>
            </div>
            <hr className={styles.line} />
            <div className={styles.summaryTotal}>
                <h2>Total</h2>
                <h2>${sum}.0</h2>
            </div>
            <Checkout sum={sum} setCart={setCart}></Checkout>
        </div>
    )
}

function Checkout({ sum, setCart }) {
    const [checkout, setCheckout] = useState(false);
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);
    const loadingTime = Math.floor(Math.random() * 900 + 900);

    useEffect(() => {
        if (!checkout) return;
        setTimeout(() => {
            setPurchaseCompleted(true);
            setTimeout(() => {
                setCheckout(false);
                setPurchaseCompleted(false);
                setCart([]);
            }, 1000)
        }, loadingTime)
    }, [checkout]);

    function onClickCheckout() {
        if (sum <= 0) return
        setCheckout(true)
    }

    return (
        <>
            {checkout &&
                <div className={styles.box}>
                    <div className={styles.purchase}>
                        {purchaseCompleted ?
                            <div className={styles.completed}>
                                <h2>Purchase completed.</h2>
                                <h2>Thank you!</h2>
                            </div> :
                            <>
                                <h2>Purchase in progress...</h2>
                                <div className={styles.loader}></div>
                            </>
                        }
                    </div>
                </div>
            }
            <button onClick={onClickCheckout} className={styles.checkout} type="button">Checkout</button>
        </>
    )
}

function filterOutProductsInCart(cart, products) {
    const productsInCart = [];
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (cart[i].id === products[j].id) {
                const elementForCart = {
                    id: products[j].id,
                    name: products[j].name,
                    category: products[j].category,
                    image: products[j].image,
                    price: products[j].price,
                    quantity: cart[i].amount
                }
                productsInCart.push(elementForCart);
                break;
            }
        }
    }

    return productsInCart
}