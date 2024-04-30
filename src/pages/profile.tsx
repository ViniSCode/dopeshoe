import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { Header } from "../components/Header";
import { ProfileContent } from "../components/Profile/ProfileContent";

import { Footer } from "@/components/Footer";
import { useGetCustomerOrdersByEmailQuery } from "../generated/graphql";

export default function Profile({ session }: any) {
  const [offset, setOffset] = useState(0);
  const productsPerPage = 4;

  const [{ data }] = useGetCustomerOrdersByEmailQuery({
    variables: {
      email: session.user.email,
      limit: productsPerPage,
      offset: offset,
    },
  });

  return (
    <div className="relative">
      <Head>
        <title>DopeShoe | Profile</title>
        <meta name="description" content="Profile" />
      </Head>
      <Header />
      <div className="top-[-60px] z-[0] absolute bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300 w-full h-[170px]"></div>
      <motion.main className="mt-28 md:mt-32 px-4 max-w-[1120px] mx-auto min-h-[100vh]">
        {data && session && <ProfileContent session={session} data={data} />}
      </motion.main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
