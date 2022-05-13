import React, {useContext, useEffect} from "react";
import {RadioGroup} from "@headlessui/react";

import CheckoutContext from "../context/CheckoutContext";
import ShippingMethodOption from "./shippingMethodOption.jsx";
import PaymentMethodOption from "./paymentMethodOption.jsx";

const CheckoutForm = ({props}) => {
    const {checkout, addressFormData, setAddressFormData, setCheckoutDeliveryMethod} = useContext(CheckoutContext);

    useEffect(() => {
        let updateAddressFormData = {
            ...addressFormData
        };
        if (checkout.email && (checkout.email !== "anonymous@example.com")) {
            updateAddressFormData.email = checkout.email;
        }
        if (checkout?.shippingAddress) {
            let adressData = {
                firstName: checkout?.shippingAddress?.firstName,
                lastName: checkout?.shippingAddress?.lastName,
                streetAddress1: checkout?.shippingAddress?.streetAddress1,
                city: checkout?.shippingAddress?.city,
                country: checkout?.shippingAddress?.country?.code,
                company: checkout?.shippingAddress?.companyName,
                state: checkout?.shippingAddress?.countryArea,
                postalCode: checkout?.shippingAddress?.postalCode,
                phone: checkout?.shippingAddress?.phone
            };
            updateAddressFormData = {
                ...updateAddressFormData,
                ...adressData
            };
        }
        console.log("updateAddressFormData", updateAddressFormData);
        setAddressFormData(updateAddressFormData);
    }, []);

    const onChangeDeliveryMethod = (deliveryMethodId) => {
        if (checkout?.shippingMethod?.id !== deliveryMethodId) {
            setCheckoutDeliveryMethod(deliveryMethodId);
        }
    };

    const onChangePaymentMethod = (e) => {
        // TODO
        console.warn("TODO onChangePaymentMethod");
    };

    return (
        <div>
            <div>
                <h2 className="text-lg font-medium text-gray-900">Kontaktinformation</h2>

                <div className="mt-4">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email-Adresse
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            id="email-address"
                            name="email-address"
                            autoComplete="email"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={addressFormData.email}
                            onChange={(e) => setAddressFormData({
                                ...addressFormData,
                                email: e.target.value
                            })}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Lieferadresse</h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Vorname
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="first-name"
                                name="first-name"
                                autoComplete="given-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.firstName}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    firstName: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Nachname
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="last-name"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.lastName}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    lastName: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Firma
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="company"
                                id="company"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.company}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    company: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Straße und Hausnummer
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                autoComplete="street-address"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.streetAddress1}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    streetAddress1: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                            Apartmentnummer, Eingang, etc.
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="apartment"
                                id="apartment"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.streetAddress2}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    streetAddress2: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Stadt
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.city}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    city: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Land
                        </label>
                        <div className="mt-1">
                            <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.country}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    country: e.target.value
                                })}
                            >
                                {/*TODO alle länder optionen autom. ziehen*/}
                                <option value="DE">United States</option>
                                <option value="DE">Canada</option>
                                <option value="DE">Mexico</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            Bundesland / Provinz
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="region"
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.state}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    state: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            Postleitzahl
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.postalCode}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    postalCode: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Telefon
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                autoComplete="tel"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={addressFormData.phone}
                                onChange={(e) => setAddressFormData({
                                    ...addressFormData,
                                    phone: e.target.value
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup value={checkout?.shippingMethod?.id} onChange={onChangeDeliveryMethod}>
                    <RadioGroup.Label className="text-lg font-medium text-gray-900">Versandart</RadioGroup.Label>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {checkout?.shippingMethods?.map((shippingMethod) => (
                            <ShippingMethodOption
                                shippingMethod={shippingMethod}
                                key={shippingMethod.id}
                            />
                        ))}
                    </div>
                </RadioGroup>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                        {checkout?.availablePaymentGateways?.map((paymentMethod) => (
                            <PaymentMethodOption
                                onChange={onChangePaymentMethod}
                                paymentMethod={paymentMethod}
                                key={paymentMethod.id}
                            />
                        ))}
                    </div>
                </fieldset>

                <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                    <div className="col-span-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            Card number
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="card-number"
                                name="card-number"
                                autoComplete="cc-number"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-4">
                        <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                            Name on card
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="name-on-card"
                                name="name-on-card"
                                autoComplete="cc-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-3">
                        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                            Expiration date (MM/YY)
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                            CVC
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="cvc"
                                id="cvc"
                                autoComplete="csc"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutForm;
