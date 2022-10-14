import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { Header } from "../components/Header";
import { ProfileContent } from "../components/Profile/ProfileContent";
import { ProfileFooter } from "../components/Profile/ProfileFooter";
import { Sidebar } from "../components/Sidebar";
import {
  useGetCustomerOrdersByEmailQuery
} from "../generated/graphql";

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
    <div>
      <Header />
      <Sidebar />
      <motion.main className="px-4 max-w-[1120px] mx-auto mt-[8rem] lg:mt-[4rem] min-h-[100vh] lg:min-h-[78vh] lg:grid lg:grid-cols-profile">
        {data && session && <ProfileContent session={session} data={data} />}
      </motion.main>
     
      <ProfileFooter />
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
