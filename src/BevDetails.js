import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import useCheckout from './useCheckout';

const BeverageDetails = () => {
    const { id } = useParams();
    const { data: beverage, error, isLoading } = useFetch('http://localhost:8000/beverages/' + id);
    const { postToCheckout, postIsLoading, postError } = useCheckout('http://localhost:8000/checkout');
    console.log("Beverage:", beverage);

    //method to upload/post the data to checkout
    const handleCheckout = async () => {
        const selectedBeverage = {
            name: beverage.name,
            price: beverage.price,
        };

        await postToCheckout(selectedBeverage);
    };
    // error handling
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        //jsx for details about beverage
        <div className="beverage-details">
            {beverage && (
                <article>
                    <h2>{beverage.name}</h2>
                    <div>Price: £{beverage.price}</div>
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

export default BeverageDetails;
