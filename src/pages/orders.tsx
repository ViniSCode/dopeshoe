import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Header } from "../components/Header";
import { Order } from "../components/Profile/Order";
import { Sidebar } from "../components/Sidebar";
import { useGetCustomerOrdersByEmailQuery } from "../generated/graphql";

export default function Orders ({ session }: any) {
  const [offset, setOffset] = useState(0);
  const productsPerPage = 10;
  const [page, setPage] = useState(1);

  console.log(session)

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
      <motion.main className="px-4 max-w-[1120px] mx-auto mt-[8rem] min-h-[70vh]">
        <div className="flex flex-col align-center justify-center gap-4">
          {data?.orders ? (
            data.orders.map((order) => (
              <Order key={order.orderId} order={order} />
            ))
          ) : (
            <span>No orders yet...</span>
          )}
        </div>
      </motion.main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="select-none flex items-center justify-between mb-24 px-4 md:px-10 md:pb-4 max-w-[1120px] mx-auto"
      >
        <>
          <div>
            <p className="text-gray-500 underline">All</p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div
              onClick={() => {
                if (data?.ordersConnection.pageInfo.hasPreviousPage) {
                  setOffset(offset - productsPerPage);
                  setPage(page - 1);
                }
              }}
              className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500 ${
                !data?.ordersConnection.pageInfo.hasPreviousPage &&
                "text-gray-500 hover:text-gray-500 opacity-80 cursor-auto"
              }`}
            >
              <BsArrowLeftShort fontSize={30} />
            </div>
            <span>{String(page)}</span>
            <div
              onClick={() => {
                if (data?.ordersConnection.pageInfo.hasNextPage) {
                  setOffset(offset + productsPerPage);
                  setPage(page + 1);
                }
              }}
              className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500 ${
                !data?.ordersConnection.pageInfo.hasNextPage &&
                "text-gray-500 hover:text-gray-500 opacity-80 cursor-auto"
              }`}
            >
              <BsArrowRightShort fontSize={30} />
            </div>
          </div>

          <div>
            <span>{String(page)}</span>
          </div>
        </>
      </motion.footer>
    </div>
  );
};

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
