import React, { useRef, useEffect, useState } from "react";
import useFetch from "../useFetch";

export default function Paypal({orders, onTransactionComplete }) {
  const paypal = useRef();
  const { data, isLoading, error } = useFetch('http://localhost:8000/checkout');  

  const [total, setTotal] = useState(0);

  // calculates price to later send to paypal so we know how much to charge for pizza
useEffect(() => {
    if (orders) {
        const totalPrice = orders.reduce((acc, order) => acc + order.price, 0);
        setTotal(totalPrice);
    }
}, [orders]);
  // uses paypal api to send the user how much the bill is
  useEffect(() => {
    // This condition ensures we don't try to render the PayPal button before the total has been calculated
    if (total > 0) {
      //paypal buttons
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  //information we send to paypal about transactions
                  description: "Checkout Total",
                    amount: {
                      currency_code: "GBP",
                      value: total,
                  },
                },
              ],
            });
          },
          //check if transaction is approved
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);

            onTransactionComplete();
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }
  }, [total, onTransactionComplete]); // Ensure the PayPal button is re-rendered whenever the total changes
  

  return (
    //shows total price and does error checking
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div ref={paypal}></div>
      <div>Total: £{total.toFixed(2)}</div>
    </div>
  );
}
