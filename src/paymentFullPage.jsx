import React, {Fragment, useContext, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

import CloseButton from "./components/closeButton.jsx";
import FullPageLayout from "./components/fullPageLayout.jsx";
import CheckoutContext from "./context/CheckoutContext";

const PaymentFullPage = ({}) => {
    const {checkout, setDisplayState, finalizeCheckout} = useContext(CheckoutContext);
    const [isMounting, setMounting] = useState(true);

    useEffect(() => {
        setMounting(false);
    }, []);

    return (
        <FullPageLayout show={true} onClose={() => setMounting(true)}>
            <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                <Dialog.Panel className="pointer-events-auto w-screen overflow-y-auto">
                    <CloseButton onClick={() => setDisplayState("widget")} />
                </Dialog.Panel>
            </Transition.Child>
        </FullPageLayout>
    );
}

export default PaymentFullPage;
