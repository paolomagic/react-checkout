import React, {useContext} from "react";
import {useApolloClient} from "@apollo/client";

import ApolloContext, {ApolloContextProvider} from "./context/ApolloContext";
import CartContext, {CartContextProvider} from "./context/CartContext";
import CheckoutContext, {CheckoutContextProvider} from "./context/CheckoutContext";
import useLocalStorage from "./hooks/useLocalStorage";
import CONST from "./lib/const";

import Cart from "./cart.jsx";

Cart.ApolloContext = ApolloContext;
Cart.CartContext = CartContext;
Cart.CheckoutContext = CheckoutContext;
Cart.BuyContext = ({children, uri, channel}) => {
    if (!uri || typeof window === "undefined") {
        return children;
    }

    return (
        <ApolloContextProvider uri={uri}>
            <CheckoutContextProvider channel={channel}>
                <CartContextProvider>
                    {children}
                </CartContextProvider>
            </CheckoutContextProvider>
        </ApolloContextProvider>
    );
};
Cart.useApi = () => {
    const apolloContext = useContext(ApolloContext);
    const client = useApolloClient();
    const cartContext = useContext(CartContext);
    const checkoutContext = useContext(CheckoutContext);

    return [
        apolloContext,
        client,
        cartContext,
        checkoutContext
    ];
};
Cart.useLocalStorage = useLocalStorage;
Cart.CHECKOUT_KEY = CONST.CHECKOUT_KEY;

export default Cart;
