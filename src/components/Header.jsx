import { useContext } from 'react';
import logo from '../assets/logo.jpg'
import Button from "./UI/Button";
import CartContext from '../store/cart-context';
import UserProgressContext from '../store/user-progress-context';

function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartNumItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="" />
                <h1>foodbear</h1>
            </div>
            <nav>
                <Button textOnly onClick={() => { userProgressCtx.handleChangeProgress('cart') }}>cart ({cartNumItems})</Button>
            </nav>
        </header>
    );
}

export default Header;