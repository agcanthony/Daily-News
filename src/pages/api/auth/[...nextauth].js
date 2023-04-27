/* eslint-disable newline-before-return */
/* eslint-disable padding-line-between-statements */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const url = process.env.API_URL + 'Usuario/Autenticar';
            
                const data = {
                    nome: 'qualquer',
                    email: credentials.username,
                    senha: credentials.password
                }
            
                var args = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    cache: 'no-store'
                };
            
                const resposta = await fetch(url, args);
            
                if (resposta.status !== 200) {
                    const error = await resposta.json();
                    throw new Error(error);
                }
                else {
                    const usuario = await resposta.json();
                    const user = {
                        id: usuario.id,
                        name: usuario.nome,
                        email: usuario.email,
                        accessToken: usuario.token
                    }
            
                    return user;
                }
            }
        })
    ],
    secret: 'sd7fhdf6GH67sdg76dg763gnd763nd723dgw7iegsd76fgs7dfg',
    jwt: {
        signingKey: { "kty": "oct", "kid": "--", "alg": "HS256", "k": "--" },
        verificationOptions: {
            algorithms: ["HS256"]
        }
    },
    session: {
        maxAge: 1 * 24 * 60 * 60
    },
    callbacks: {
        async session({ session, token, user }) {
             session.apiToken = token.apiToken;
            return session
        },
        async jwt({ user, token, account, profile }) {
            if (user !== undefined)
                token.apiToken = user.accessToken;

            return token;
        }
    },
    pages: {
        error: '/login'
    }
}
export default NextAuth(authOptions)