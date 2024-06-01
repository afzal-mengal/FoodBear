import Header from './components/Header';
import AvailableMeals from './components/AvailableMeals';
import Cart from './components/Cart';
import { CartContextProvider } from './store/cart-context';
import { UserProgressContextProvider } from './store/user-progress-context';

function App() {
  return (
    <>
      <CartContextProvider>
        <UserProgressContextProvider>
          <Cart></Cart>
          <Header></Header>
        </UserProgressContextProvider>
        <AvailableMeals></AvailableMeals>
      </CartContextProvider>
    </>
  );
}

export default App;
