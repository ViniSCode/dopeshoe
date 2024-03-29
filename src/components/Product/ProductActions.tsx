import { loadStripe } from "@stripe/stripe-js";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";

interface ProductActionProps {
  product: {
    __typename?: "Product";
    name: string;
    price: number;
    id: string;
    discount?: number | null;
    description: string;
    brand?: { __typename?: "Brand"; brandName: string } | null;
    image: Array<{
      __typename?: "Image";
      mainImage: { __typename?: "Asset"; url: string };
      productImages: Array<{ __typename?: "Asset"; url: string }>;
    }>;
    available: number;
  };
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function ProductActions({ product }: ProductActionProps) {
  const [addProductInCartCount, setAddProductInCartCount] = useState(1);
  const { handleAddProduct } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const session = await getSession();

    if (!session) {
      signIn("google");
      toast.warning("Você precisa estar logado para efetuar o checkout");
      return;
    }

    try {
      const { sessionId } = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: addProductInCartCount,
          productId: product.id,
          productName: `${product.brand?.brandName} ${product.name}`,
          session: session,
        }),
      }).then((res) => res.json());

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });
      console.log(error);
      setLoading(false);
    } catch (err: any) {
      toast.error("Checkout error");
      console.log("catch: ", err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-2 w-full h-[full] rounded-[13px]">
      <div className="bg-gray-600 w-full h-full rounded-lg p-5">
        <h2 className="text-[22px] w-full truncate max-w-full">
          {product.brand?.brandName} {product.name}
        </h2>
        <div className="flex gap-1">
          <p className="text-gray-200 font-bold">
            {product.available ? product.available : 0} Available
          </p>
        </div>

        <div className="mt-5 flex items-start gap-1">
          <span className="flex items-center gap-1">
            <p className="text-[20px] md:text-2xl">R$</p>
            <p className="text-[20px] md:text-2xl">
              {(product.price / 100).toFixed(2)}
            </p>
          </span>
          <span className="text-green-500 text-[14px]">
            {product.discount}% OFF
          </span>
        </div>

        <div className="mt-5 flex gap-1">
          <button
            disabled={addProductInCartCount === 1}
            className="indent-[-9999em] uppercase bg-gray-900 rounded-lg flex items-center justify-center w-[40px] h-[35px] disabled:opacity-80"
            onClick={() => {
              if (addProductInCartCount > 1) {
                setAddProductInCartCount(addProductInCartCount - 1);
              }
            }}
          >
            Decrease
            <HiMinusSm size={20} />
          </button>
          <div className="bg-gray-900 rounded-lg flex items-center justify-center w-[40px]">
            {addProductInCartCount}
          </div>
          <button
            disabled={product.available === addProductInCartCount}
            className="indent-[-9999em] uppercase bg-gray-900 rounded-lg flex items-center justify-center w-[40px] disabled:opacity-80"
            onClick={() => {
              if (product.available > addProductInCartCount) {
                setAddProductInCartCount(addProductInCartCount + 1);
              }
            }}
          >
            Increase
            <HiOutlinePlusSm size={20} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center flex-col gap-2">
          <form method="POST" className="w-full">
            <section>
              <button
                disabled={loading}
                role="link"
                onClick={handleCheckout}
                className="bg-red-500 w-full rounded py-2 px-4 transition-filter hover:brightness-75 disabled:opacity-80"
              >
                Comprar
              </button>
            </section>
          </form>
          <button
            className="indent-[-9999em] uppercase bg-yellow-500 w-full rounded py-2 px-4 transition-filter flex items-center justify-center hover:brightness-75"
            onClick={() => handleAddProduct(product, addProductInCartCount)}
          >
            Adicionar ao carrinho
            <FiShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
