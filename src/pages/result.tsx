import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import useSWR from "swr";
import { useCart } from "../hooks/useCart";

export default function Result() {
  const [copy, setCopy] = useState(false);
  const router = useRouter();
  const { clearCart } = useCart();

  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout/${router.query.session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    clearCart();
  }, []);

  return !error && router.query.session_id ? (
    <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center h-[100vh] gap-4">
      <BiCheckCircle size={40} className="text-green-500" />
      <h1 className="text-2xl">Payment Successful</h1>
      <button
        onClick={() => router.push("/")}
        className="px-8 py-2 bg-green-500 mt-10 text-white rounded flex items-center justify-center gap-2"
      >
        <BsArrowLeft size={15} />
        Voltar
      </button>
    </div>
  ) : (
    <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center h-[100vh] gap-4">
      <h1 className="text-2xl">Something Went Wrong...</h1>
      <button
        onClick={() => router.push("/profile")}
        className="px-8 py-2 bg-red-500 text-white rounded flex items-center justify-center gap-2"
      >
        <BsArrowLeft size={15} />
        Voltar
      </button>
    </div>
  );
}
