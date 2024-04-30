import { AnimatePresence, motion, useCycle } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const sideVariants = {
  closed: {
    width: "10%",
    opacity: 0,
  },
  open: {
    width: "100%",
    opacity: 1,
    transition: {
      delayChildren: 1,
      duration: 0.6,
    },
  },
};

const aside = {
  open: {
    width: "100vw",
    y: 0,
    opacity: 1,
  },
  closed: {
    width: "100vw",
    y: "-100vh",
    opacity: 0,
  },
};

export function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [open, cycleOpen] = useCycle(false, true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search/${search}`);
      cycleOpen();
    }
  };

  return (
    <>
      <FiSearch
        size={19}
        onClick={() => cycleOpen()}
        className="cursor-pointer"
      />
      <AnimatePresence>
        (
        <motion.aside
          animate={open ? "open" : "closed"}
          variants={aside}
          transition={{ duration: 0.2 }}
          className="opacity-0 px-10 pt-5 mx-auto flex flex-col bg-white h-[100%] w-0 fixed top-0 right-0 bottom-0 z-[200] shadow-lg overflow-x-hidden"
        >
          <div className="max-w-full md:max-w-full lg:max-w-[1120px] mx-auto w-full">
            <motion.div
              animate={open ? "open" : "closed"}
              variants={sideVariants}
              exit={"closed"}
              className="relative select-none flex items-center gap-2"
            >
              <div className="flex gap-2 items-center relative w-full">
                <FiSearch
                  size={20}
                  color="#AEAEAE"
                  className="absolute top-1/2 left-3 right-0 bottom-0 -translate-y-1/2"
                />
                <input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  ref={inputRef}
                  onKeyDown={handleKeyPress}
                  value={search}
                  type="text"
                  className="text-sm bg-[#F1F1F1] px-[10px] rounded-full w-full h-10 pl-10 focus:outline-none"
                  placeholder="Search"
                  maxLength={50}
                />
                <p
                  className="cursor-pointer font-medium hover:opacity-50 transition-opacity h-fit"
                  onClick={() => cycleOpen()}
                >
                  Cancel
                </p>
              </div>
            </motion.div>
            <h3 className="text-base font-medium pb-4 text-[#707072] mt-10">
              Popular Search Terms
            </h3>
            <ul
              className="flex flex-col text-xl font-semibold gap-2"
              onClick={() => cycleOpen()}
            >
              <Link href="/search/Air Force 1">
                <li className="cursor-pointer hover:opacity-50 transition-opacity">
                  Air Force 1
                </li>
              </Link>
              <Link href="/search/Jordan">
                <li className="cursor-pointer hover:opacity-50 transition-opacity">
                  Jordan
                </li>
              </Link>
              <Link href="/search/Air Max">
                <li className="cursor-pointer hover:opacity-50 transition-opacity">
                  Air Max
                </li>
              </Link>
            </ul>
          </div>
        </motion.aside>
        )
      </AnimatePresence>
    </>
  );
}

// import { FiSearch } from "react-icons/fi";

// export interface SearchBarProps {
//   search?: string;
//   setSearch?: any;
//   setPage?: any;
// }

// const container = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//   },
//   duration: {},
// };

// export function SearchBar({ search, setSearch, setPage }: SearchBarProps) {
//   return (
//     <div>
// <div className="flex gap-2 items-center relative">
//   <FiSearch
//     size={20}
//     color="#AEAEAE"
//     className="absolute top-1/2 left-3 right-0 bottom-0 -translate-y-1/2"
//   />
//   <input
//     onChange={(e) => {
//       setSearch(e.target.value);
//     }}
//     value={search}
//     type="text"
//     className="text-sm bg-[#F1F1F1] px-[10px] rounded-[10px] w-full h-10 pl-10"
//     placeholder="Search"
//     maxLength={50}
//   />
// </div>
//     </div>
//   );
// }
