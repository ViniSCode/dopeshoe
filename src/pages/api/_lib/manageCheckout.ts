import { GetCustomerByEmailDocument } from "../../../generated/graphql";
import { client } from "../../../lib/urql";
import { stripe } from "../../../services/stripe";

// SAVE CUSTOMER ORDERS ON HYGRAPH
// ONLY THE REFERENCE TO THE STRIPE ORDER
// Save only the first product, 
// (if shopping cart with several products) and the reference for the remaining products
// update the available amount for the remaining products in the shopping cart

export async function saveCheckout(
  checkoutId: string,
  // customerId: string,
  // metadata: any
) {
  // get user by customerId
  const lineItems = await stripe.checkout.sessions.listLineItems(checkoutId);  
  const productsMetadata = await stripe.products.retrieve(
    lineItems.data[0].price!.product.toString()
    );
  const email = productsMetadata.metadata.email;    
  const {data: {customers}} = await client.query(GetCustomerByEmailDocument, { email: email }).toPromise();

  try {
    const sumTotal = lineItems.data.reduce((prev, curr) => prev + curr.amount_total, 0);
    const totalAmount = lineItems.data.reduce((prev, curr) => prev + curr.quantity!, 0);
    const isMoreThanOneProduct = lineItems.data.length > 1 ? true : false;
    const productAvailable = Number(productsMetadata.metadata.available) - lineItems.data[0].quantity!;

    try {
      await fetch(
        `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
            mutation CreateCustomerOrder {
              createOrder (
                data: {
                  orderId: "${checkoutId}", 
                  amount: ${totalAmount},
                  price: ${sumTotal},
                  customer: {connect: {email: "${email}"} },
                  isMoreThanOneProduct: ${isMoreThanOneProduct},
                  product: {connect: {id: "${productsMetadata.metadata.productId}"}}
                }
              ) {
                id
              }
              updateProduct (where: {id: "${productsMetadata.metadata.productId}"}, data: {available: ${productAvailable}}) { id }
            
              publishOrder (where: {orderId: "${checkoutId}"}) { id }
              publishCustomer (where: {email: "${email}"}) { id }
              publishProduct (where: {id: "${productsMetadata.metadata.productId}"}) { id }
            }    
            `,
          }),
        }
      );

      if (lineItems.data.length > 1) {
        let counter = 0;
        await Promise.all(
          lineItems.data.map(async (item) => {
            if (counter === 0) {
              // don't need to change the amount for the first product
              // 1st product amount was changed in the fetch above
            } else {
              // change the cart products available amount for the remaining products
              
              const itemMetadata = await stripe.products.retrieve(
                item.price!.product.toString()
              );

              const itemAvailable = Number(itemMetadata.metadata.available) - item.quantity!;
              updateRemainingProductsAvailableAmount(item, itemMetadata, itemAvailable)
            }
            counter++;
          })
        )
      }
    } catch(err: any) {
      console.log(err.message)
    }

  } catch (err: any) {
    console.log(err);
  }
}


async function updateRemainingProductsAvailableAmount (item: any, productsMetadata: any, itemAvailable: any) {
  await fetch(
    `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        mutation CreateCustomerOrder {
          updateProduct (where: {id: "${productsMetadata.metadata.productId}"}, data: {available: ${itemAvailable}}) { id }
          publishProduct (where: {id: "${productsMetadata.metadata.productId}"}) { id }
        }    
        `,
      }),
    }
  );
}