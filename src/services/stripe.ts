import Stripe from "stripe";

// Consumindo a SDK do Stripe
export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'Ignews'
        },
    }
)