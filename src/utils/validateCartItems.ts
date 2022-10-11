import { toast } from "react-toastify";
import { CheckProductDocument } from "../generated/graphql";
import { client } from "../lib/urql";

interface Cart {
  cartProductId: string;
  cartAmount: number;
  cartPrice: number;
}

export interface CustomLineItems {
  price_data: {
    currency: string;
    unit_amount: any;
    product_data: {
      name: any;
      images: any;
      metadata: {
        productId: string;
        brand: string;
        image: string;
        productName: string;
        available: number;
        email: any;
      }
    };
  };
  quantity: number;
}

// check cart products (valid, not valid);
// if valid => return line_items to checkout
export async function validateCartItems(cartItems: Cart[], email: any) {
  const isValidData = await Promise.all(
    cartItems.map(async (item) => {
      const response = await client
        .query(CheckProductDocument, { id: item.cartProductId })
        .toPromise();
      const dbProduct = response.data.product.edges[0].node;
      if (
        item.cartProductId === dbProduct.id &&
        item.cartAmount <= dbProduct.available &&
        item.cartPrice === dbProduct.price
      ) {
        // valid cart products
        const dbProductImages = dbProduct.image[0].productImages.map(
          (img: any) => {
            return img.url;
          }
        );
        return {
          id: dbProduct.id,
          name: dbProduct.name,
          description: dbProduct.description,
          price: dbProduct.price,
          image: dbProductImages,
          cartAmount: item.cartAmount,
          currency: "BRL",
          metadata: {
            productId: dbProduct.id,
            brand: dbProduct.brand.brandName,
            image: dbProduct.image[0].mainImage.url,
            productName: dbProduct.name,
            available: dbProduct.available,
            email: email
          },
        };
      } else {
        // invalid cart products
        toast.error("Invalid Cart Products");
        return;
      }
    })
  );

  if (isValidData) {
    const lineItems: CustomLineItems[] = isValidData.map((data) => {
      const items = {
        price_data: {
          currency: data!.currency,
          unit_amount: data!.price,
          product_data: {
            name: data!.name,
            images: data!.image,
            metadata: data!.metadata,
          },
        },
        quantity: data!.cartAmount,
      };

      return {
        ...items,
      };
    });

    return lineItems ?? [];
  }

  return [];
}


//productId: productId,
// productImage: product.image[0].mainImage.url,
// productName: productName,

