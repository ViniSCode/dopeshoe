import { GetCustomerByStripeIdDocument } from "../../../generated/graphql";
import { client } from "../../../lib/urql";
import { stripe } from "../../../services/stripe";

export async function saveCheckout (
  checkoutId: string,
  customerId: string,
) {
  // get user by customerId
  const lineItems = await stripe.checkout.sessions.listLineItems(checkoutId);
  const {data: customers} = await client.query(GetCustomerByStripeIdDocument, {customerId}).toPromise();
  const email = customers.customers[0].email;

  try {
    if (lineItems.data.length > 1) {
      // save orders (shopping cart + 1 items)
      console.log(lineItems)
    } else {
      // save product order (1 product)
      console.log(lineItems.data)
      await fetch(`https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${process.env.API_ACCESS_TOKEN}`,},
        body: JSON.stringify({
          query: `
            mutation CreateCustomerOrder {    
              createOrder (
                data: {
                  orderId: "${checkoutId}", 
                  amount: ${lineItems.data[0].quantity},
                  name: "${lineItems.data[0].description}",
                  price: ${lineItems.data[0].amount_total},
                  customer: {connect: {email: "${email}"} }
                }
              ) { id }
            
              publishOrder (where: {orderId: "${checkoutId}"}) { id }
              publishCustomer (where: {email: "${email}"}) { id }
            }`,
        }),
      });
    }
  } catch (err: any) {
    console.log(err);
  }

}