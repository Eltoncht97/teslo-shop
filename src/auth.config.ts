import NextAuth, { type NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/create-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth);
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      //podemos aqui validar en la base de datos el status del cliente por si
      //se borra de la base de datos pero no se actualiza el token !!!!
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        //buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        //comparar contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        //regresar al usuario
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const {
  signIn,
  signOut,
  auth: Middleware,
  handlers,
} = NextAuth(authConfig);
