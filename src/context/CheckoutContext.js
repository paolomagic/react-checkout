import React, {createContext, useState, useEffect, useContext} from "react";
import {useQuery, useApolloClient} from "@apollo/client";
import useLocalStorage from "../hooks/useLocalStorage";
import CONST from "../lib/const";
import CHECKOUT_BY_TOKEN from "../queries/checkoutByToken";
import CHECKOUT_CREATE from "../mutations/checkoutCreate";
import VARIANT_BY_SKU from "../queries/variantBySku";

export const CheckoutContext = createContext({});

export const CheckoutContextProvider = ({children, channel}) => {
    const client = useApolloClient();
    const [checkoutToken, setCheckoutToken] = useLocalStorage(CONST.CHECKOUT_KEY);
    const [checkout, setCheckout] = useState(null);

    const {loading, error, data, refetch} = useQuery(CHECKOUT_BY_TOKEN, {
        variables: {checkoutToken}
    });

    const createCheckout = async (variantId) => {
        const {data} = await client.mutate({
            mutation: CHECKOUT_CREATE,
            variables: {
                //TODO what is required?
                email: "anonymous@example.com",
                channel: channel,
                lines: [
                    {
                        quantity: 1,
                        variantId: variantId
                    }
                ]
            }
        });
        console.log("createCheckout, data:", data);
        if (data?.checkoutCreate?.errors?.length) {
            data.checkoutCreate.errors.forEach(err => console.warn(err));
        }

        if (data?.checkoutCreate?.checkout?.token) {
            setCheckoutToken(data.checkoutCreate.checkout.token);
        }
    };

    const getCheckoutByToken = async () => {
        console.log("getCheckoutByToken", checkoutToken);
        if (checkoutToken) {
            refetch({checkoutToken});
        } else {
            setCheckout(null);
        }
    };

    useEffect(() => {
        getCheckoutByToken();
    }, [checkoutToken]);

    useEffect(() => {
        console.log(loading, error, data);
        setCheckout(data?.checkout);
    }, [loading, error, data]);

    console.log("CheckoutContext, checkout:", checkout);

    return (
        <CheckoutContext.Provider value={{
            checkout,
            createCheckout
        }}>
            {children}
        </CheckoutContext.Provider>
    );
};

CheckoutContext.CheckoutContextProvider = CheckoutContextProvider;
export default CheckoutContext;
