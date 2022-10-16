import { motion } from "framer-motion";
import { AiOutlineLogin, AiOutlinePhone } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GetCustomerOrdersByEmailQuery } from "../../generated/graphql";
import { AllOrders } from "./AllOrders";
import { ProfileSidebar } from "./ProfileSidebar";

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
        variants={container}
        initial="hidden"
        animate="visible"
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
        variants={container}
        initial="hidden"
        animate="visible"
        className="select-none w-[290px] mx-auto md:w-[680px]"
      >
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          {session.user.image && (
            <img src={session.user.image} className="rounded-full h-40 w-40" />
          )}
          <strong className="text-2xl">{session.user.name}</strong>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="select-none w-full mx-auto mt-8 flex items-center justify-between lg:flex-col gap-4 md:gap-16 lg:gap-20 lg:hidden"
          >
            {menuItemsMobile.map((item) => (
              <ProfileSidebar
                key={item.name}
                href={item.href}
                name={item.name}
                icon={item.icon}
              />
            ))}
          </motion.div>
        </div>
        <div className="mt-10">
          <strong className="text-lg">Last Orders:</strong>
          <div className="mt-10 flex flex-col items-center justify-center gap-6">
              {
                data?.orders && (
                  <div className="w-full flex flex-col align-center justify-center gap-4">
                    {data!.orders.length > 0 ? (
                      data!.orders.map((order) => (
                        <AllOrders key={order.orderId} order={order} />
                      ))
                    ) : (
                      <span className="text-center">No orders yet...</span>
                    )}
                  </div>
                )
              }
          </div>
        </div>
      </motion.div>
    </>
  );
}
