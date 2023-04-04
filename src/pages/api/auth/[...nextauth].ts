import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// lib

export const authOptions: AuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.name = user.name;
        token.email = user.email;
        token.address = user.address;
        token.phone = user.phone;
        token.is_verified_community_owner = user.is_verified_community_owner;
        token.is_verified_user = user.is_verified_user;
      }
      return token;
    },
    session({ session, user, token }) {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.address = token.address;
        session.user.phone = token.phone;
        session.user.image = "";
        session.user.is_verified_user = token.is_verified_user;
        session.user.is_verified_community_owner =
          token.is_verified_community_owner;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    // maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { body: data } = req;

        try {
          const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });

          const result = await response.json();

          if (result.status == "OK" && result.data != null) {
            return result.data;
          }
        } catch (e) {
          // failed return null
          // handled by auth
          return null;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default async function auth(req, res) {
  return await NextAuth(req, res, authOptions);
}
