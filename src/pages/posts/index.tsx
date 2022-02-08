import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a>
                        <time>07 de fevereiro de 2022</time>
                        <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong>
                        <p>Ipsum vel sunt explicabo laborum praesentium temporibus asperiores itaque, sit officiis atque, quas possimus soluta. Eveniet quis debitis, consequuntur at ut ipsa.</p>
                    </a>
                    <a>
                        <time>07 de fevereiro de 2022</time>
                        <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong>
                        <p>Ipsum vel sunt explicabo laborum praesentium temporibus asperiores itaque, sit officiis atque, quas possimus soluta. Eveniet quis debitis, consequuntur at ut ipsa.</p>
                    </a>
                    <a>
                        <time>07 de fevereiro de 2022</time>
                        <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong>
                        <p>Ipsum vel sunt explicabo laborum praesentium temporibus asperiores itaque, sit officiis atque, quas possimus soluta. Eveniet quis debitis, consequuntur at ut ipsa.</p>
                    </a>
                    <a>
                        <time>07 de fevereiro de 2022</time>
                        <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong>
                        <p>Ipsum vel sunt explicabo laborum praesentium temporibus asperiores itaque, sit officiis atque, quas possimus soluta. Eveniet quis debitis, consequuntur at ut ipsa.</p>
                    </a>
                </div>
            </main>
        </>
    );
}