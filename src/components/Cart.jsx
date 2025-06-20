import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cart() {
    const { products, cart, setCart, loading } = useOutletContext();
    console.log(cart)
    const productsInCart = filterOutProductsInCart(cart, products);

    //filter products in cart from all products


    console.log(productsInCart)

    return (
        <div className="container">
            <div className="cartElements">
                <button className="back">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </button>
                <h2>Shopping Cart</h2>
                <div className="elements">
                    {productsInCart.map(product => <CartElement key={product.id} element={product} cart={cart} setCart={setCart} />)}
                </div>
            </div>
            <OrderSummary />
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
        <div className="element">
            <div className="image"><img src={element.image} /></div>
            <h3 className="name">{element.name}</h3>
            <p className="category">{element.category}</p>
            <p className="stock"></p>
            <p className="quantity">{element.quantity}</p>
            <div className="adjustQty">
                <button className="minus" onClick={() => changeProductQuantity("-")}>
                    <FontAwesomeIcon icon="fa-solid fa-minus" style={{ color: "#4A4A4A", }} />
                </button>
                <p className="qty">{element.quantity}</p>
                <button className="plus" onClick={() => changeProductQuantity("+")}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#4A4A4A", }} />
                </button>
            </div>
            <div className="total">
                <button className="delete" onClick={() => removeFromCart(element)}><svg viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"></path> </svg></button>
                <p className="total">${element.price * element.quantity}.0</p>
            </div>
        </div>
    )
}

function OrderSummary() {
    return (
        <div className="summary">
            <h2 className="title"></h2>
            <h2 className="sum"></h2>
            <div className="subtotal">
                <p></p>
                <p></p>
            </div>
            <div className="subtotal">
                <p></p>
                <p></p>
            </div>
            <hr className="line" />
            <div className="total">
                <h2></h2>
                <h2></h2>
            </div>
            <button className="checkout">Checkout</button>
        </div>
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