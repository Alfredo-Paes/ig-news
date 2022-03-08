import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { getPrismicClient } from '../../services/prismic';
import { RichText } from "prismic-dom";
import Head from "next/head";

import styles from './post.module.scss';

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}
/**
 * "dangerouslySetInnerHTML": Perigosamente "setar" o inner HTML
 * Essa função permite que você possa "jogar diretamente um html" no react.
 * Entretanto, como o nome da função diz, "perigosamente", mexer diretamente no innerHTML
 * é perigoso demais. Isso abre espaço para ataques de "cross-site scripting (XSS)".
 */
export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                </article>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session  = await getSession({ req });

    const { slug } = params;

    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID<any>('post', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    };

    return {
        props: {
            post,
        }
    }
}