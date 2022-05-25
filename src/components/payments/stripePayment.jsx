import React, {Fragment, useContext, useEffect, useState} from "react";
import {PaymentElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import CheckoutContext from "../../context/CheckoutContext";
import BuyContext from "../../context/BuyContext";

let GLOBAL_PAYMENT_INTENT_HANDLED_FLAG = false;

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const StripePaymentForm = ({clientSecret}) => {
    const elements = useElements();
    const stripe = useStripe();

    console.log("StripePaymentForm", stripe, elements);
    const onSubmit = async (e) => {
        e.preventDefault?.();
        e.stopPropagation?.();

        console.log("CONFIRMING", elements._commonOptions.clientSecret.clientSecret);
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: window.location.href,
            },
        });

        //TODO global flag reset?!?
        console.log("confirmPayment", result);
    }

    const retrievePaymentIntent = async () => {
        const result = await stripe.retrievePaymentIntent(clientSecret);
        console.log("retrievePaymentIntent", result, result?.paymentIntent?.status);
    };

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }

        retrievePaymentIntent();
    }, [stripe]);

    return (
        <form id="stripe-payment-form" onSubmit={onSubmit}>
            <PaymentElement id="stripe-payment-element" />
            <div className="border-t border-gray-200 py-6">
                <button
                    disabled={!elements || !stripe}
                    type="submit"
                    className={
                        classNames(
                            elements && stripe ? "hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500" : "cursor-not-allowed",
                            "w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white"
                        )
                    }
                >
                    Jetzt bezahlen
                </button>
            </div>
        </form>
    );
};

const StripePayment = ({stripePromise}) => {
    const {shop, paymentProviders} = useContext(BuyContext);
    const {checkout, checkoutToken, selectedPaymentGatewayId} = useContext(CheckoutContext);
    const [clientSecret, setClientSecret] = useState(null);

    let apiUri = "";
    paymentProviders.forEach(provider => {
        if (provider.name === "stripe") {
            apiUri = provider.config.apiUri;
        }
    });

    const createPaymentIntent = async () => {
        console.log("create_payment_intent", GLOBAL_PAYMENT_INTENT_HANDLED_FLAG, clientSecret)
        try {
            if (GLOBAL_PAYMENT_INTENT_HANDLED_FLAG || clientSecret) {
                return;
            }
            GLOBAL_PAYMENT_INTENT_HANDLED_FLAG = true;

            console.log("request at", new Date().getTime());
            const paymentIntent = await fetch(apiUri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "stripe.create_payment_intent",
                    checkoutToken: checkout?.token,
                    shop: shop,
                    selectedPaymentGatewayId: selectedPaymentGatewayId,
                    amount: String(checkout?.totalPrice?.gross?.amount)
                })
            }).then(res => res.json());
            console.log("set to", paymentIntent);

            if (!paymentIntent || !paymentIntent.client_secret) {
                return;
            }

            setClientSecret(paymentIntent.client_secret);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        createPaymentIntent();

        return () => {
            // console.log("UNMOUNTING STRIPEPAYMENT");
            // GLOBAL_PAYMENT_INTENT_HANDLED_FLAG = false;
        };
    }, []);

    console.log("stripePromise:", stripePromise, "render StripeWrapper, clientSecret:", clientSecret, "apiUri:", apiUri, "GLOBAL_PAYMENT_INTENT_HANDLED_FLAG:", GLOBAL_PAYMENT_INTENT_HANDLED_FLAG);

    let component = null
    if (clientSecret && apiUri) {
        component = (
            <Elements stripe={stripePromise} options={{clientSecret}}>
                <StripePaymentForm clientSecret={clientSecret} />
            </Elements>
        )
    }

    return (
        <Fragment key="stripe-payment-form">{component}</Fragment>
    );
}

export default StripePayment;
