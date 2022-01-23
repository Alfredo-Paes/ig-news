import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { fauna } from '../../services/fauna';
import { stripe } from '../../services/stripe';

type User = {
    ref: {
        id: string;
    }
    data: {
        stripe_customer_id: string;
    }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    //Verificar se o metódo da requisição é "POST"
    if (req.method === 'POST') {
        const session = await getSession({ req }); // obtera as informações de uma sessão(usuário, etc...)

        // Evitar que, seja registrado mais de uma vez quando o usuário clica em "Subscribe button" (01) 
        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id;

        if (!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
            })

            // Evitar que, seja registrado mais de uma vez quando o usuário clica em "Subscribe button" (02)
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            )

            customerId = stripeCustomer.id
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'], // método do pagamento que é aceito
            billing_address_collection: 'required', // "billing_address_collection": se é obrigatório o usuário inserir endereço
            line_items: [
                { price: 'price_1KAkhgFQ9Ts1undDuC0hATr8', quantity: 1 } // quantidade de produtos que serão adquiridos
            ],
            mode: 'subscription', // 'subscription': pagamento recorrente
            allow_promotion_codes: true, // permissão para criar um cupom de descontos
            success_url: process.env.STRIPE_SUCCESS_URL, //url quando a operção der certo
            cancel_url: process.env.STRIPE_CANCEL_URL // url caso o usuário cancele a operação
        })

        return res.status(200).json({ sessionId: checkoutSession.id })
    } else {
        res.setHeader('Allow', 'POST');//Se não for um método POST:
        res.status(405).end('Method not allowed');//Devolver um "405": "Method not allowed"(Método não permitido)
    }
}