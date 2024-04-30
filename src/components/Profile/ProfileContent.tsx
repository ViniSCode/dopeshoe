import { motion } from "framer-motion";
import { AiOutlineLogin, AiOutlinePhone } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GetCustomerOrdersByEmailQuery } from "../../generated/graphql";
import { AllOrders } from "./AllOrders";

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

interface ProfileContentProps {
  session: {
    user: {
      email: string;
      image: string;
      name: string;
    };
  };
  data: GetCustomerOrdersByEmailQuery | undefined;
}

export const menuItems = [
  {
    icon: <CgProfile className="h-[22px] w-[22px] md:w-[26px] md:h-[26px]" />,
    href: "/profile",
    name: "Profile",
  },
  {
    icon: (
      <BiPurchaseTagAlt className="h-[22px] w-[22px] md:w-[26px] md:h-[26px]" />
    ),
    href: "/orders",
    name: "Orders",
  },
  {
    icon: (
      <AiOutlinePhone className="h-[22px] w-[22px] md:w-[26px] md:h-[26px]" />
    ),
    href: "https://www.linkedin.com/in/vinicius-rodrigues-5897831b8/",
    name: "Contact",
  },
  {
    icon: (
      <AiOutlineLogin className="h-[22px] w-[22px] md:w-[26px] md:h-[26px]" />
    ),
    href: "/",
    name: "Logout",
  },
];

export const menuItemsMobile = [
  {
    icon: <BiPurchaseTagAlt className="h-[22px] w-[22px]" />,
    href: "/orders",
    name: "Orders",
  },
  {
    icon: (
      <AiOutlinePhone className="h-[22px] w-[22px] md:w-[26px] md:h-[26px]" />
    ),
    href: "https://www.linkedin.com/in/vinicius-rodrigues-5897831b8/",
    name: "Contact",
  },
  {
    icon: <AiOutlineLogin className="h-[22px] w-[22px]" />,
    href: "/",
    name: "Logout",
  },
];

export function ProfileContent({ session, data }: ProfileContentProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="select-none w-full relative z-[20]"
      >
        <div className="flex flex-col items-center gap-4">
          {session.user.image && (
            <img
              src={session.user.image}
              className="mt-[2rem] rounded-full h-36 w-36"
              referrerPolicy="no-referrer"
              alt={session.user.name}
            />
          )}
          <strong className="mt-3 text-2xl font-medium">
            {session.user.name}
          </strong>
        </div>
        <div className="mt-10">
          <strong className="text-xl font-medium">Last Orders:</strong>
          <div className="mt-10 flex flex-col items-center justify-center gap-6">
            {data?.orders && (
              <div className="w-full flex flex-col align-center justify-center gap-4">
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
      </motion.div>
    </>
  );
}
