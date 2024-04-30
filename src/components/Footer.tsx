import { FiArrowUp } from "react-icons/fi";
import { LuArrowUpRight } from "react-icons/lu";

interface FooterProps {
  footerRef?: any;
}

export function Footer({ footerRef }: FooterProps) {
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bg-[#111111] w-full" ref={footerRef}>
      <footer className="py-20 px-5 max-w-full md:max-w-full lg:max-w-[1120px] mx-auto mt-24 text-white flex items-end md:flex-row justify-between md:items-end gap-10 md:gap-6 flex-wrap sm:flex-nowrap">
        <div className="flex flex-row flex-wrap w-fit gap-10 items-end md:justify-between md:w-full">
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-2">
              <h2 className="font-medium text-[28px]">Contact</h2>
              <LuArrowUpRight size={12} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="block font-medium text-[14px]">EMAIL</span>
              <span className="block">jairrodriguesmd@gmail.com</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="block font-medium text-[14px]">ADDRESS</span>
            <span className="block">Rio Grande do Sul, Brazil</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="block font-medium text-[14px]">
              2023 — Copyright
            </span>
          </div>
          <div
            className="hidden w-fit h-fit justify-end relative cursor-pointer md:flex"
            onClick={scrollToTop}
          >
            <div className="w-10 h-10 rounded-full bg-white"></div>
            <FiArrowUp
              size={20}
              className="text-black absolute top-1/2 -translate-y-1/2 right-1/2 left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
        <div className="w-fit h-fit flex justify-end relative cursor-pointer md:hidden">
          <div className="w-10 h-10 rounded-full bg-white"></div>
          <FiArrowUp
            onClick={scrollToTop}
            size={20}
            className="text-black absolute top-1/2 -translate-y-1/2 right-1/2 left-1/2 -translate-x-1/2"
          />
        </div>
      </footer>
    </div>
  );
}
