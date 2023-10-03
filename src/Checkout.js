import useFetch from './useFetch';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PayPal from './PayPal/PayPal';

const Checkout = () => {
    const { data: fetchedOrders, error: ordersError, isLoading: ordersLoading } = useFetch('http://localhost:8000/checkout/');
    const { data: sizes, error: sizesError, isLoading: sizesLoading } = useFetch('http://localhost:8000/sizes/');
    const { data: toppings, error: toppingsError, isLoading: toppingsLoading } = useFetch('http://localhost:8000/toppings/');
    const { data: bases, error: basesError, isLoading: basesLoading } = useFetch('http://localhost:8000/bases/');
    const [checkout, setCheckOut] = useState(false);

    
    const [orders, setOrders] = useState([]);
    //adds orders into state for viewing
    useEffect(() => {
        if (fetchedOrders) {
            setOrders(fetchedOrders);
        }
    }, [fetchedOrders]);
    // get the id for pizza sizes
    const getSizeName = (sizeId) => {
        const sizeObj = sizes.find(size => size.id === sizeId);
        return sizeObj ? sizeObj.size : 'Unknown size';
    };
    //get id for toppings
    const getToppingsNames = (toppingIds) => {
        //error handling for when the toppings would load at different times or when user doesnt want additional toppings
        if (!Array.isArray(toppingIds) || toppingIds.length === 0) return null;
    
        return toppingIds.map(id => {
            const topping = toppings.find(topping => topping.id === id);
            return topping ? topping.name : 'Unknown topping';
        }).join(', ');
    };
    
    //gets information for bases
    const getBaseName = (baseId) => {
        const baseObj = bases.find(base => base.id === baseId);
        console.log("bases");
        console.log(bases);
        console.log("Order Data:", orders);
        return baseObj ? baseObj.name : 'Unknown base';
    };

    //allows you to remove items from checkout and deletes it from database (db.json)
    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8000/checkout/${orderId}`);
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
        } catch (error) {
            console.error("Error deleting the order:", error);
        }
    };

    //is called when items are payed for, to make it clear that the transaction went through
    const clearOrders = async () => {
        console.log("Clearing orders...");
    
        // If there are no orders, just return
        if (!orders.length) return;
    
        const deletePromises = orders.map(order => 
            axios.delete(`http://localhost:8000/checkout/${order.id}`)
        );
    
        try {
            await Promise.all(deletePromises);  // Execute all delete requests simultaneously
            setOrders([]);
            window.location.reload();  
        } catch (error) {
            console.error("Error clearing the orders from backend:", error);
        }
    };
    


    // error handleing
    if (ordersLoading || sizesLoading || toppingsLoading || basesLoading) return <div>Loading...</div>;
    if (ordersError || sizesError || toppingsError || basesError) return <div>Error fetching data</div>;
    

    return (
        //displays relevant information about items added to checkout
        <div className="checkout">
            <h2>Your Orders</h2>
            {orders.map(order => (
                <div key={order.id} className="order-item">
                    {order.title && order.title.includes("/") ? (  // Check if the order title contains '/'
                        <>
                            <h3>50/50 Pizza</h3>
                            <p>{order.title}</p>
                            <p>Base: {order.base}</p>
                            <p>Size: {order.size}</p>
                        </>
                    ) : (
                        <h3>{order.name}</h3>
                    )}
                    {order.sizeId && <p>Size: {getSizeName(order.sizeId)}</p>}
                    {order.baseId && <p>Base: {getBaseName(order.baseId)}</p>}
                    <p>Price: £{order.price}</p>
                    {order.toppingIds && order.toppingIds.length > 0 && <p>Toppings: {getToppingsNames(order.toppingIds)}</p>}
                    <button onClick={() => handleDelete(order.id)}>Remove</button>
                </div>
            ))}
            {/* payment via paypal API */}
        <div className="pay-button">
                {checkout ? (
                    <PayPal orders={orders} onTransactionComplete={clearOrders} />
                ) : (
                    <button onClick={() => {
                        setCheckOut(true);
                    }}>Pay Now</button>
                )}
        </div>
        

        </div>
        
    );
    
    
};

export default Checkout;
