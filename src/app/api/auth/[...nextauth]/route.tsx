import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import User from "@/types/user";
import { email } from "zod/v4";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/signin", //Dẫn đến trang login custom
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        console.log("<<=== 🚀 payload ===>>", payload);
        console.log(
          "<<=== 🚀 apiUrl ===>>",
          `${apiUrl}/api/v1/customers/login`
        );

        const res = await fetch(`${apiUrl}/api/v1/customers/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await res.json();
        const tokens = json.data;
        //Chứa access_token và fresh_token
        console.log("<<=== 🚀 tokens ===>>", tokens);

        if (!res.ok) {
          throw new Error("UnAuthorized");
        }
        // If no error and we have user data, return it
        if (res.ok && tokens) {
          console.log("<<=== 🚀 access tokens ===>>", tokens.accessToken);
          const res = await fetch(`${apiUrl}/api/v1/customers/profile`, {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
          console.log("<<=== 🚀 res profile ===>>", res);
          let user = await res.json();
          console.log("<<=== 🚀 user profile ===>>", user);
          if (!res.ok) {
            throw new Error("UnAuthorized");
          }
          user = {
            ...user,
            _id: user.data?._id,
            name: user.data?.fullName,
            first_name: user.data?.first_name,
            last_name: user.data?.last_name,
            email: user.data?.email,
            phone: user.data?.phone,
            address: user.data?.address,
            city: user.data?.city,
            zip_code: user.data?.zip_code,
            createdAt: user.data?.createdAt,
            // image: user.avatar,
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          };
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log("callbacks jwt", token, user, account, profile);
      if (account && user) {
        return {
          ...token,
          _id: user?._id,
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone: user?.phone,
          address: user?.address,
          city: user?.city,
          zip_code: user?.zip_code,
          accessToken: user?.token,
          refreshToken: user?.refreshToken,
          createdAt: user?.createdAt,

          // avatar: token.avatar,
        };
      }

      return token;
    },

    async session({ session, token }) {
      console.log("callbacks session", token);
      if (token && session.user) {
        session.user._id = token._id;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.phone = token.phone;
        session.user.address = token.address;
        session.user.city = token.city;
        session.user.zip_code = token.zip_code;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.createdAt = token.createdAt;

        //   session.user.picture = token.picture || token.avatar;
      }
      console.log("callbacks session", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
