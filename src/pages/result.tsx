import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCheckCircle } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { CgCopy } from "react-icons/cg";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function Result() {
  const [copy, setCopy] = useState(false);
  const [copyText, setCopyText] = useState('');
  const router = useRouter();

  const { data, error } = useSWR(
      router.query.session_id
      ? `/api/checkout/${router.query.session_id}`
      : null,
      (url) => fetch(url).then(res => res.json())
  )

  function handleCopy(paymentId: string) {
    setCopyText(paymentId)
  }

  useEffect(() => {
    if (!error && router.query.session_id) {
      toast.warning('STRIPE - educational purpose only, your order was not actually placed')
    }
  }, [])

  return !error && router.query.session_id ? (
    <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center h-[100vh] gap-4">
      <BiCheckCircle size={40} className="text-green-500"/>
      <h1 className="text-2xl">Payment Successful</h1>
      <h2 className="text-1xl md:text-2xl text-yellow-500">Heads up! You must Copy or Order ID</h2>
      {data ? 
      (
      <CopyToClipboard text={copyText}>
        <div className="bg-gray-700 text-center rounded-md p-4 text-1xl md:text-2xl flex items-center gap-5 cursor-pointer" onClick={() => handleCopy(data.session.payment_intent.id)}>
          <pre className={`${copyText.length > 0 && 'text-green-500'}`}>{data.session.payment_intent.id}</pre>
          {copyText.length > 0 ? <FiCheck className="text-green-500" /> :  <CgCopy /> }
        </div>
      </CopyToClipboard>
      
      )
      : 
      (
        <h2>Loading</h2>
      )
    }
      <button onClick={() => router.push('/')} className="px-8 py-2 bg-green-500 mt-10 text-white rounded flex items-center justify-center gap-2">
        <BsArrowLeft size={15} />
        Voltar
      </button>
    </div> 
  ) : (
    <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center h-[100vh] gap-4">
      <h1 className="text-2xl">Something Went Wrong...</h1>
      <button onClick={() => router.push('/')} className="px-8 py-2 bg-red-500 text-white rounded flex items-center justify-center gap-2">
        <BsArrowLeft size={15} />
        Voltar
      </button>
    </div>
  )
}