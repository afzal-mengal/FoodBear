import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import CartContext from "../store/cart-context";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import UserProgressContext from "../store/user-progress-context";
import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    }
};

function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { data, isLoading, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    const totalPrice = currencyFormatter.format(cartCtx.items.reduce((total, item) => total + (item.price * item.quantity), 0));

    function handleCheckout(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    let cartContent;

    let actions = (<>
        <Button type="button" textOnly onClick={() => { userProgressCtx.handleChangeProgress('looking') }}>Close</Button>
        <Button>Checkout</Button>
    </>)

    if (isLoading) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress === 'checkout'}>
            <h2>Success!</h2>
            <p>Order Submitted</p>
            <p className="modal-actions">
                <Button onClick={() => {
                    cartCtx.clearItems();
                    userProgressCtx.handleChangeProgress('looking');
                    clearData();
                }}>Close</Button>
            </p>
        </Modal>
    }

    if (userProgressCtx.progress === 'cart') {
        cartContent = <Modal open={userProgressCtx.progress === 'cart' || userProgressCtx.progress === 'checkout'}><h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => {
                    return (
                        <li key={item.id} className="cart-item">
                            <CartItem item={item}></CartItem>
                        </li>
                    );
                })}
            </ul>
            <p className="cart-total">{totalPrice}</p>
            <p className="modal-actions">
                <Button textOnly onClick={() => { userProgressCtx.handleChangeProgress('looking') }}>Close</Button>
                {cartCtx.items.length > 0 ? <Button onClick={() => { userProgressCtx.handleChangeProgress('checkout') }}>Go to Checkout</Button> : null}
            </p>
        </Modal>
    }
    else if (userProgressCtx.progress === 'checkout') {
        cartContent = <Modal open={userProgressCtx.progress === 'cart' || userProgressCtx.progress === 'checkout'}>
            <form onSubmit={handleCheckout}>
                <h2>Checkout</h2>
                <p>Total Amount: {totalPrice}</p>
                <Input label="Full Name" type="text" id="name"></Input>
                <Input label="E-mail Address" type="email" id="email"></Input>
                <Input label="Street" type="text" id="street"></Input>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"></Input>
                    <Input label="City" type="text" id="city"></Input>
                </div>
                {error && <Error title="Failed to submit order" message={error}></Error>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    }

    return (cartContent);
}

export default Cart;