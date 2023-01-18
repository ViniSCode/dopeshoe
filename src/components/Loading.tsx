import Image from "next/image";

export function Loading () {
  return (
    <div className="bg-gray-900 fixed inset-0 h-[100vh] z-[9999] w-full">
      <div className="flex items-center justify-center mt-[45vh] animate-pulse">
        <Image src="/assets/dopeshoe.svg" alt="" width={275} height={61}/>
      </div>
    </div>
  );
}