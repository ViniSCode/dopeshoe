import { motion, useDragControls } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
interface SliderProps {
  children: ReactNode;
  sliderCount: number;
}

export function Slider({ children, sliderCount }: SliderProps) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function handlePrevClick() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  function handleNextClick() {
    if (current < sliderCount - 1) {
      setCurrent(current + 1);
    }
  }

  useEffect(() => {
    if (slideRef.current) {
      setCarouselWidth(
        slideRef.current.scrollWidth - slideRef.current.offsetWidth
      );
    }
  }, []);

  const controls = useDragControls();

  return (
    <section id="popular-plans-section" className="w-full h-full relative">
      <div className="absolute top-1/2 left-0 w-fit flex justify-between px-5 z-[20]">
        <div
          className="p-3 rounded-full h-fit w-fit bg-white cursor-pointer"
          onClick={handlePrevClick}
        >
          <RiArrowLeftSLine size={22} />
        </div>
      </div>
      <div className="absolute top-1/2 right-0 w-fit flex justify-between px-5 z-[20]">
        <div
          className="p-3 rounded-full h-fit w-fit bg-white cursor-pointer"
          onClick={handleNextClick}
        >
          <RiArrowRightSLine size={22} />
        </div>
      </div>
      <div
        className="overflow-x-hidden overflow-y-hidden flex h-full relative z-[15]"
        ref={slideRef}
      >
        <motion.div
          animate={{
            x: `calc(-${current * (carouselWidth / 4)}px)`,
          }}
          className={`mt-5 gap-2 flex mx-auto cursor-grabbing ${
            isGrabbing
              ? "cursor-grabbing pointer-events-none"
              : "cursor-grab pointer-events-auto"
          }`}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
