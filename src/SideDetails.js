import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useState } from 'react';
import useCheckout from './useCheckout';

const SideDetails = () => {
    const { id } = useParams();
    const { data: side, error, isLoading } = useFetch('http://localhost:8000/sides/' + id);
    const { postToCheckout, postIsLoading, postError } = useCheckout('http://localhost:8000/checkout');
    console.log("Side:", side);
    // allows data to be posted to checkout database
    const handleCheckout = async () => {
        const selectedSide = {
            name: side.name,
            price: side.price,
            description: side.description
        };

        await postToCheckout(selectedSide);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        //displays relevant information about sides
        <div className="side-details">
            {side && (
                <article>
                    <h2>{side.name}</h2>
                    <p>{side.description}</p>
                    <div>Price: £{side.price}</div>
                </article>
            )}

            <button
                style={{
                    color: 'white',
                    backgroundColor: '#f1356d',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'none',
                }}
                onClick={handleCheckout}
            >
                Add to Cart
            </button>

        </div>
    );
};

export default SideDetails;
