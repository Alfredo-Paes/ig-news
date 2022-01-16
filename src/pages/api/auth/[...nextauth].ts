import { query as q } from "faunadb"

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from "../../../services/fauna"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: 'read:user',
                },
            },
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user
            try {
                await fauna.query(
                    q.If(// SE
                        q.Not(//NÃO
                            q.Exists(//EXISTE
                                q.Match(// Exato, seja oque procura....
                                    q.Index('user_by_email'), //Index para fazer a busca
                                    q.Casefold(user.email) //Casefold = tratar lower-case
                                )
                            )
                        ),
                        q.Create( //Cria um novo usuário
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get(//Busque o usuário correspondente
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )
                return true
            } catch {
                return false
            }
        },
    }
})