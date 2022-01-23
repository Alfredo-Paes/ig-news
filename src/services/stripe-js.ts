import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {// Obter uma chave pública
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    return stripeJs;
}