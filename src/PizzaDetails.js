import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';
import SizeList from './PizzaList/SizeList';
import ToppingList from './PizzaList/ToppingList';
import useCheckout from './useCheckout';
import BaseList from './PizzaList/BaseList';
import useCalculateTotalPrice from './useCalculateTotalPrice';
import { useSpring, animated } from 'react-spring';

const PizzaDetails = () => {
    const { id } = useParams();
    const { data: pizza, error, isLoading } = useFetch('http://localhost:8000/pizza/' + id);
    const { data: sizes } = useFetch('http://localhost:8000/sizes/');
    const { data: toppings } = useFetch('http://localhost:8000/toppings/');
    const { data: bases } = useFetch('http://localhost:8000/bases/');
    const [selectedSize, setSelectedSize] = useState('');
    const [extraToppings, setExtraToppings] = useState([]);
    const [selectedBase, setSelectedBase] = useState(null);
    const { postToCheckout, postIsLoading, postError } = useCheckout('http://localhost:8000/checkout');

    const canCheckout = selectedSize && selectedSize !== 'null';
    const totalPrice = useCalculateTotalPrice(selectedSize, sizes, selectedBase, bases, extraToppings);
    const [toppingsOpen, setToppingsOpen] = useState(false);

    //gets a list of all bases to display, given there are any
    useEffect(() => {
        if (bases && bases.length > 0) {
            //defaults to Stone Crust
            const stoneCrustBase = bases.find(base => base.name === "Stone Crust");
            setSelectedBase(stoneCrustBase?.id);
        }
    }, [bases]);
    //allows for toppings to be added
    const handleToppingChange = (toppingId) => {
        setExtraToppings(prev => extraToppings.includes(toppingId) ? prev.filter(id => id !== toppingId) : [...prev, toppingId]);
    };
    // allows for information to be processed via checkout
    const handleCheckout = async () => {
        const actualSize = sizes.find((s) => s.id === selectedSize);
        const actualToppings = toppings.filter((topping) => extraToppings.includes(topping.id));

        const selectedPizza = {
            name: pizza.title,
            size: actualSize ? actualSize.size : "",
            sizeId: selectedSize,
            baseId: selectedBase,
            price: totalPrice,
            toppings: actualToppings.map(topping => topping.name),
            toppingIds: extraToppings
        };

        await postToCheckout(selectedPizza);
    };
    // Animation setups:
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 100,
    });

    const [hovered, setHovered] = useState(false);
    const buttonSpring = useSpring({
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
    });

    const slideIn = useSpring({
        from: { transform: 'translateY(-10px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        delay: 200,
    });

    const toggleToppings = () => {
        setToppingsOpen(!toppingsOpen);
    };


    // error handling
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div className="pizza-details">
            {pizza && (
                <article>
                    {/* relevant informations of pizzas*/}
                    <h1 className="header-title">{pizza.title}</h1>
                    <p className="diet-description">{pizza.diet}</p>
                    <div className="pizza-description">{pizza.body}</div>

                    <div className="base-selection">
                        {/* options for pizza base */}
                        {bases && bases.map(base => (
                            <button
                                key={base.id}
                                className={`base-button ${selectedBase === base.id ? 'selected' : ''}`}
                                onClick={() => setSelectedBase(base.id)}
                            >
                                {base.name} (+£{base.additionalCost})
                            </button>
                        ))}
                    </div>

                    {/* options for pizza size  */}
                    <div className="size-selection">
                        {sizes && sizes.map(size => (
                            <button

                                key={size.id}
                                className={`size-button ${selectedSize === size.id ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size.id)}
                            >
                                {size.size}
                            </button>
                        ))}
                    </div>

                    <ToppingList toppings={toppings} selectedToppings={extraToppings} onToppingChange={handleToppingChange} />



                    {/* <div className="toppings-folder">
                        <button className="folder-button" onClick={toggleToppings}>Toppings</button>

                        {toppingsOpen &&
                            <div className="toppings-dropdown">
                                {toppings && toppings.map(topping => (
                                    <button
                                        key={topping.id}
                                        className={`topping-button ${extraToppings.includes(topping.id) ? 'selected' : ''}`}
                                        onClick={() => handleToppingChange(topping.id)}
                                    >
                                        {topping.name}
                                    </button>
                                ))}
                            </div>
                        }
                    </div> */}



                    <div className="price-section">
                        Total price: £{totalPrice}
                    </div>
                </article>
            )}
            {/* handles checkout */}
            <button
                className={`checkout-button ${canCheckout ? 'active' : 'inactive'}`}
                onClick={handleCheckout}
                disabled={!canCheckout}
            >
                Check out
            </button>

            {!canCheckout && <p className="warning-text">Please select a size before proceeding to checkout.</p>}
        </div>
    );
};

export default PizzaDetails;