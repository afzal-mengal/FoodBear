import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (item) => { },
    clearItems: () => { }
});

function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        };

        return { ...state, items: updatedItems };
    }

    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (state.items[existingCartItemIndex].quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        }
        else {
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity - 1
            };

            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === "CLEAR_ITEMS") {
        return { ...state, items: [] };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: "ADD_ITEM", item: item });
    }

    function removeItem(item) {
        dispatchCartAction({ type: "REMOVE_ITEM", item: item });
    }

    function clearItems() {
        dispatchCartAction({ type: "CLEAR_ITEMS" })
    }

    const cartContext = {
        items: cartState.items,
        addItem: addItem,
        removeItem: removeItem,
        clearItems: clearItems
    };

    return (<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>)
}

export default CartContext;