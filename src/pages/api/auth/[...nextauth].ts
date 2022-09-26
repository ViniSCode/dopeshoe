import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { client } from "../../../lib/urql";
import { UserAlreadyExistsDocument } from "./../../../generated/graphql";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        const {
          data: { customers }} = await client.query(UserAlreadyExistsDocument, { email }).toPromise();

        if (customers.length > 0) {
          // if customer already exists
        } else {
          try {
            await createCustomer(email!);
          } catch (err) {
            console.log(err);
          }
        }

        return true;
      } catch {
        return false;
      }
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
});

// create a new (HyGraph) customer, to store their orders.
async function createCustomer(email: string) {
  await fetch(
    `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
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
}
