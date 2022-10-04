import {
  GetCustomerByStripeIdDocument,
  GetProductAvailableDocument
} from "../../../generated/graphql";
import { client } from "../../../lib/urql";
import { stripe } from "../../../services/stripe";

export async function saveCheckout(
  checkoutId: string,
  customerId: string,
  metadata: any
) {
  // get user by customerId
  const { data: customers } = await client.query(GetCustomerByStripeIdDocument, { customerId }).toPromise();
  const lineItems = await stripe.checkout.sessions.listLineItems(checkoutId);
  const email = customers.customers[0].email;

  try {
    if (lineItems.data.length > 1) {
      // save orders (First Product + 3 items)

        const sumTotal = lineItems.data.reduce((prev, curr) => prev + curr.amount_total, 0);
        const totalAmount = lineItems.data.reduce((prev, curr) => prev + curr.quantity!, 0);

        const productsMetadata = await stripe.products.retrieve(
          lineItems.data[0].price!.product.toString()
        );

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
                      isMoreThanOneProduct: true,
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
        } catch(err: any) {
          console.log(err.message)
        }
    } else {
      const { data: { product } } = await client.query(GetProductAvailableDocument, { id: metadata.productId }).toPromise();
      const productAvailable = product.edges[0].node.available - lineItems.data[0].quantity!
      
      await fetch(
        `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
            mutation CreateCustomerOrder {
              createOrder (
                data: {
                  orderId: "${checkoutId}", 
                  amount: ${lineItems.data[0].quantity},
                  price: ${lineItems.data[0].amount_total},
                  customer: {connect: {email: "${email}"} },
                  product: {connect: {id: "${metadata.productId}"}}
                }
              ) {
                id
              }
              updateProduct (where: {id: "${metadata.productId}"}, data: {available: ${productAvailable}}) { id }
            
              publishOrder (where: {orderId: "${checkoutId}"}) { id }
              publishCustomer (where: {email: "${email}"}) { id }
              publishProduct (where: {id: "${metadata.productId}"}) { id }
            }    
            `,
          }),
        }
      );
    }
  } catch (err: any) {
    console.log(err);
  }
}


// async function createShoppingCartOrder (
//   checkoutId: any,
//   item: any,
//   email: any,
//   productsMetadata: any,
//   productAvailable: any
// ) {
//   await fetch(
//     `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
//       },
//       body: JSON.stringify({
//         query: `
//         mutation CreateCustomerOrder {
//           createOrder (
//             data: {
//               orderId: "${checkoutId}", 
//               amount: ${item.quantity},
//               price: ${item.amount_total},
//               customer: {connect: {email: "${email}"} },
//               product: {connect: {id: "${productsMetadata.metadata.productId}"}}
//             }
//           ) {
//             id
//           }
//           updateProduct (where: {id: "${productsMetadata.metadata.productId}"}, data: {available: ${productAvailable}}) { id }
        
//           publishOrder (where: {orderId: "${checkoutId}"}) { id }
//           publishCustomer (where: {email: "${email}"}) { id }
//           publishProduct (where: {id: "${productsMetadata.metadata.productId}"}) { id }
//         }    
//         `,
//       }),
//     }
//   );
// }