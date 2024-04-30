import { loadStripe } from "@stripe/stripe-js";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";

interface ProductActionProps {
  product: {
    __typename?: "Product";
    name: string;
    price: number;
    available: number;
    sizes?: string | null;
    id: string;
    discount?: number | null;
    description: string;
    brand?: { __typename?: "Brand"; brandName: string } | null;
    image: Array<{
      __typename?: "Image";
      mainImage: { __typename?: "Asset"; url: string };
      productImages: Array<{ __typename?: "Asset"; url: string }>;
    }>;
  };
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function ProductActions({ product }: ProductActionProps) {
  const [addProductInCartCount, setAddProductInCartCount] = useState(1);
  const { handleAddProduct } = useCart();
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const sizesArray = product?.sizes?.split(",");

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
    <div className="w-full h-fit">
      <div className="w-full h-full flex flex-col gap-2 md:gap-5">
        <p className="text-[#717171] font-medium text-sm md:text-base">
          {product.brand?.brandName}
        </p>
        <h2 className="text-2xl md:text-3xl w-full truncate max-w-full font-medium">
          {product.name}
        </h2>
        <div className="flex gap-1">
          <p className="text-[#717171] font-medium text-sm md:text-base">
            {product.available ? product.available : 0} Available
          </p>
        </div>

        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1 text-3xl md:text-4xl">
            <p className="font-bold  text-black">$</p>
            <p className="font-bold  text-black">
              {(product.price / 100).toFixed(2)}
            </p>
          </span>
          <span className="text-green-500 text-sm md:text-base font-medium">
            {product.discount}% OFF
          </span>
        </div>

        <div className="flex items-center justify-center flex-col gap-2 mt-14">
          <form method="POST" className="w-full">
            <section>
              <button
                disabled={loading}
                role="link"
                onClick={handleCheckout}
                className="bg-[#F1F1F1] font-medium text-black w-full rounded-full py-4 px-4 transition-filter hover:brightness-75 disabled:opacity-80"
              >
                Buy Now
              </button>
            </section>
          </form>
          <button
            className="bg-black text-white font-medium w-full rounded-full gap-2 py-4 px-4 flex items-center justify-center hover:opacity-70 transition-opacity"
            onClick={() => handleAddProduct(product, addProductInCartCount)}
          >
            Add to cart
            <FiShoppingBag size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
