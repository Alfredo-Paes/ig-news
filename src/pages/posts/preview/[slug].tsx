import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { getPrismicClient } from '../../../services/prismic';
import { RichText } from "prismic-dom";
import Head from "next/head";

import styles from '../post.module.scss';
import Link from "next/link";
import { useRouter } from "next/router";

interface PostPreviewProps {
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
export default function PostPreview({ post }: PostPreviewProps) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`);
        }
    }, [session]);

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
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a href="">Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths = () => {
    return {
        paths: [], // Aqui é passado quais páginas desejam ser renderizadas estaticamente ao serem acessadas
        fallback: 'blocking', 
        /**
         * fallback: 'true', 'false', 'blocking'
         * true: se uma página for acessada e, ela não for estática, será carregada pelo o browser
         * -> fallback - true: pode ocasionar "layout shift", ou seja, executar a página sem conteúdo e depois carregar. Também não é recomendado para SEO.
         * 
         * false: Se ele for executado e, não encontrar conteúdo estático, ele irá retornar um 404.
         * 
         * blocking: Se não houver um conteúdo estático, ele irá renderizar um por "server side rendering", depois que 
         * o conteúdo estático estiver carregado, ele renderiza o mesmo por completo.
         */
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug } = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID<any>('post', String(slug), {});
    /**
     * Como é um preview, deseja exibir apena uma parte do conteúdo, logo, será usado o "splice"
     */
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    };

    return {
        props: {
            post,
        },
        
        redirect: 60 * 30, //30 minutos
    }
}