import { GetStaticProps } from 'next';
import Head from 'next/head';


import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig-news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome!</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Person coding" />
      </main>
    </>
  )
}
// Método responsável em consumir uma api via ssr(Server Side Rendering)
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KAkhgFQ9Ts1undDuC0hATr8')

//  const price = await stripe.prices.retrieve('price_1KAkhgFQ9Ts1undDuC0hATr8', {
//    expand: ['product']
//  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  }

 return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}
/**
 * revalidate: Quanto tempos em segundos, deseja que a página passe sem ser revalidada. 
 * 60 * 60 * 24
 * Primeiro "60": 1 minuto
 * Segundo "60": 1 hora
 * "24": 1 dia
 */