import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { Header } from "../components/Header";
import { AllOrders } from "../components/Profile/AllOrders";
import { OrdersPagination } from "../components/Profile/OrdersPagination";
import {
  menuItems,
  menuItemsMobile,
} from "../components/Profile/ProfileContent";
import { ProfileFooter } from "../components/Profile/ProfileFooter";
import { ProfileSidebar } from "../components/Profile/ProfileSidebar";
import { Sidebar } from "../components/Sidebar";
import { useGetCustomerOrdersByEmailQuery } from "../generated/graphql";

export default function Orders({ session }: any) {
  const [offset, setOffset] = useState(0);
  const productsPerPage = 6;
  const [page, setPage] = useState(1);

  const [{ data }] = useGetCustomerOrdersByEmailQuery({
    variables: {
      email: session.user.email,
      limit: productsPerPage,
      offset: offset,
    },
  });

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      <Head>
        <title>DopeShoe | My Orders</title>
        <meta name="description" content="My Orders" />
      </Head>
      <Header />
      <Sidebar />
      <main className="px-4 max-w-[1120px] mx-auto mt-[8rem] lg:mt-[4rem] min-h-[95vh] lg:grid lg:grid-cols-profile">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden lg:select-none lg:flex lg:flex-col lg:gap-20"
        >
          {menuItems.map((item) => (
            <ProfileSidebar
              key={item.name}
              href={item.href}
              name={item.name}
              icon={item.icon}
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="select-none w-[290px] mx-auto md:w-[680px] mb-10"
        >
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="select-none w-full mb-16 mx-auto mt-8 flex items-center justify-between lg:flex-col gap-4 md:gap-16 lg:gap-20 lg:hidden"
            >
              {menuItemsMobile.map((item) => (
                <ProfileSidebar
                  key={item.name}
                  href={item.href}
                  name={item.name}
                  icon={item.icon}
                  isOrders
                />
              ))}
            </motion.div>
          </div>
          <div>
            <strong className="text-lg">Orders:</strong>
            <div className="mt-2 flex flex-col items-center justify-center gap-6">
              {data?.orders && (
                <div className="flex w-full flex-col align-center justify-center gap-4">
                  {data!.orders.length > 0 ? (
                    data!.orders.map((order) => (
                      <AllOrders key={order.orderId} order={order} />
                    ))
                  ) : (
                    <span className="text-center">No orders yet...</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <OrdersPagination
            data={data}
            offset={offset}
            page={page}
            productsPerPage={productsPerPage}
            setOffset={setOffset}
            setPage={setPage}
          />
        </motion.div>
      </main>

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
