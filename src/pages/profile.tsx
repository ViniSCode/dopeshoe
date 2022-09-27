import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { Header } from "../components/Header";
import { ProfileContent } from "../components/Profile/ProfileContent";
import { Sidebar } from "../components/Sidebar";
import {
  useGetCustomerOrdersByEmailQuery
} from "../generated/graphql";

export default function Profile({ session }: any) {
  const [{ data }] = useGetCustomerOrdersByEmailQuery({
    variables: {
      email: session.user.email,
    },
  });

  console.log(data);

  return (
    <div>
      <Header />
      <Sidebar />
      <motion.main className="px-4 max-w-[1120px] mx-auto mt-[8rem] min-h-[100vh] lg:grid lg:grid-cols-profile">
        {data && session && <ProfileContent session={session} data={data} />}
      </motion.main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="select-none flex items-center justify-center mb-24 px-4 md:px-10 md:pb-4 max-w-[1120px] mx-auto"
      >
        <Link href="/">
          <div className="flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500">
            <BsArrowLeftShort fontSize={30} />
            <p className="text-[18px]">Voltar</p>
          </div>
        </Link>
      </motion.footer>
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
