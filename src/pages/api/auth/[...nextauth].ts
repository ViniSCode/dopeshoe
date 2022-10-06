import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { client } from "../../../lib/urql";
import { UserAlreadyExistsDocument } from './../../../generated/graphql';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email;

      const {data: {customers}} = await client.query(UserAlreadyExistsDocument, {email}).toPromise();
      if (customers.length === 0) {
        await createCustomer(email!);
      } else {
        // if customer doesn't exist
      }
      

      return true;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
});

async function createCustomer(email: string) {
  const data = await fetch(
    `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        mutation CrateCustomer {
          createCustomer(data: {email: "${email}"}) { id },
          publishCustomer (where: {email: "${email}"}) { id }
        }`,
      }),
    }
  );
  

  const response = await data.json();

  return response;
}
