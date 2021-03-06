import React from "react";
import "./styles/tailwind.css";
import "./styles/styles.scss";

import ApolloContext, {ApolloContextProvider} from "./context/ApolloContext";
import CheckoutContext, {CheckoutContextProvider} from "./context/CheckoutContext";
import BuyContext, {BuyContextProvider} from "./context/BuyContext";
import useLocalStorage from "./hooks/useLocalStorage";
import CONST from "./lib/const";

import Cart from "./cart.jsx";
import CheckoutLine from "./components/checkoutLine.jsx";

Cart.CheckoutLine = CheckoutLine;

Cart.ApolloContext = ApolloContext;
Cart.CheckoutContext = CheckoutContext;
Cart.BuyContext = BuyContext;
Cart.useLocalStorage = useLocalStorage;
Cart.CHECKOUT_KEY = CONST.CHECKOUT_KEY;

const ReactCheckout = ({...props}) => <BuyContextProvider {...props} />;
ReactCheckout.API = CheckoutContext;

export default ReactCheckout;
