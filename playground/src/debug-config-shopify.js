export default {
    shop: "shopify",
    uri: "https://vonaffenfels-playground.myshopify.com/api/2021-07/graphql.json",
    storefrontApiKey: "5861012507d5e7b228c9c8f13b88551f",
    channel: "b2c",
    paymentProviders: [
        {
            name: "stripe",
            config: {
                apiUri: "https://sjj82k9wpe.execute-api.us-east-1.amazonaws.com/webhook",
                apiKey: "pk_test_51KyvxoC6ZdKmUgiesvK91vRkvWQ0X7qrPDLObx0U8awu9dyPwfTiU3vcCRpOnvCruyCMUoFsIDoE1aDm8flWLefY00es42eq9A"
            }
        },
        {
            name: "manual",
            config: {
                apiUri: "https://sjj82k9wpe.execute-api.us-east-1.amazonaws.com/webhook"
            }
        }
    ]
};
