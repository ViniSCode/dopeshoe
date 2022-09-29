import { CustomLineItems } from "./validateCartItems";

export function getProductsMetadata (items: CustomLineItems[]) {
let counter = 0;

  const formattedItems = items.map(item => {
    return {
      key: counter++,
      productId: item.price_data.product_data.metadata.productId
    }
  })

  const products_metadata = formattedItems.reduce((obj, item) => ({...obj, [item.key]: item.productId}) ,{});

  return products_metadata;
}