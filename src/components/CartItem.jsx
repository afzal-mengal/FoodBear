import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/cart-context";


function CartItem({ item }) {

    const cartCtx = useContext(CartContext);

    function onDecrease() {
        cartCtx.removeItem(item);
    }

    function onIncrease() {
        cartCtx.addItem(item)
    }

    return (
        <>
            <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{item.quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </>
    );
}

export default CartItem;