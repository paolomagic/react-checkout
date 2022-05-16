import React, {Fragment, useContext, useEffect, useState} from "react";
import {PaymentElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import CheckoutContext from "../../context/CheckoutContext";

const StripePaymentForm = () => {
    const elements = useElements();
    const stripe = useStripe();

    console.log("StripePayment", stripe, elements);

    return (
        <form>
            <PaymentElement />
        </form>
    );
};

const StripePayment = ({stripePromise}) => {
    const {checkout} = useContext(CheckoutContext);
    const [clientSecret, setClientSecret] = useState(null);

    const createPaymentIntent = async () => {
        try {
            if (clientSecret) {
                return;
            }
            //TODO create the paymentIntent on the server side for given checkout!
            const paymentIntent = await fetch("https://api.stripe.com/v1/payment_intents", {
                method: "POST",
                headers: {
                    Authorization: "Bearer sk_test_51KyvxoC6ZdKmUgieW1IAyZBFfkxEuBdeTxgvYktBP00NA8zW1gNTmDgnrAYG9wZTelB4OyTk6gwUKYHuVZxrDf4V000yCrGre0",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    currency: String(checkout?.totalPrice?.gross?.currency).toLowerCase(),
                    amount: String(checkout?.totalPrice?.gross?.amount).replace(".", "")
                }).toString()
            }).then(res => res.json());
            console.log(paymentIntent);
            setClientSecret(paymentIntent.client_secret);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        createPaymentIntent();
    }, []);

    console.log(stripePromise, clientSecret)
    if (!clientSecret) {
        return null;
    }

    return (
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <StripePaymentForm />
        </Elements>
    );
}

export default StripePayment;
