// Import required hooks and utilities
import { useState } from "react";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import usePostToCheckout from "./usePostToCheckout";
import useCheckout from "./useCheckout";
import useCalculateTotalPrice from "./useCalculateTotalPrice";

const Create = () => {
    // Fetch pizzas from the provided API
    const { data: pizzas = [], isLoading, error } = useFetch('http://localhost:8000/pizza');
    const { data: bases = [], isLoading: basesLoading, error: basesError } = useFetch('http://localhost:8000/bases');
    const { data: sizes = [], isLoading: sizesLoading, error: sizesError } = useFetch('http://localhost:8000/sizes');



    const { postToCheckout, postIsLoading, postError } = useCheckout('http://localhost:8000/checkout');

    const [selectedBase, setSelectedBase] = useState("Stone Crust");

    // State to track the selected pizzas for each half
    const [firstHalf, setFirstHalf] = useState(null);
    const [secondHalf, setSecondHalf] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    // const [selectedPrice, setSelectedPrice] = useState(0);
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState('');


    const totalPrice = useCalculateTotalPrice(selectedSize, sizes, selectedBase, bases, []);




    // Handler to process the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure both pizza halves are selected
        if (!firstHalf || !secondHalf || !selectedBase || !selectedSize) {
            setValidationError("All selections must be made before creating a pizza!");
            return;
        } else {
            setValidationError('');
        }

        // Create the new combined pizza object
        const combinedPizza = {
            title: `${firstHalf.title} / ${secondHalf.title}`,
            body: `${firstHalf.body} + ${secondHalf.body}`,
            base: selectedBase,
            size: selectedSize,
            price: totalPrice,
            id: pizzas[pizzas.length - 1].id + 1 // Increment the ID from the last pizza
        };

        try {
            await postToCheckout(combinedPizza);  // Await the POST request
            navigate("/checkout");  // Redirect to the checkout page after successful POST
        } catch (err) {
            console.error("Failed to post pizza:", err);
        }
    };

    const selectBase = (baseName) => {
        setSelectedBase(baseName);
    };

    const selectSize = (sizeName) => {
        setSelectedSize(sizeName);
    };

    // Loading and error states
    if (isLoading || basesLoading || sizesLoading) return <div>Loading...</div>;
    if (error || basesError || sizesError) return <div>Error loading data</div>;


    return (
        <div className="create">
            <h2>Add a new Pizza</h2>
            <form onSubmit={handleSubmit}>
                <div className="selection-group">
                    <h3>Select a Base</h3>
                    <div className="button-group">
                        {/* buttons for selection of bases */}
                        {bases.map(base => (
                            <button
                                key={base.id}
                                onClick={() => selectBase(base.name)}
                                className={selectedBase === base.name ? 'selected' : ''}
                            >
                                {base.name} (£{base.additionalCost.toFixed(2)})
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="selection-group">
                    <h3>Select a Size</h3>
                    <div className="button-group">
                        {/* buttons for selection of sizes */}
                        {sizes.map(size => (
                            <button
                                key={size.id}
                                onClick={() => selectSize(size.size)}
                                className={selectedSize === size.size ? 'selected' : ''}
                            >
                                {size.size} (£{size.price.toFixed(2)})
                            </button>
                        ))}
                    </div>
                </div>

                            {/* selection of first half */}
                <select
                    value={firstHalf ? firstHalf.title : ""}
                    onChange={e => setFirstHalf(pizzas.find(p => p.title === e.target.value))}
                >
                    <option value="">Select a pizza for first half</option>
                    {pizzas.filter(pizza => !secondHalf || pizza.title !== secondHalf.title).map(pizza => (
                        <option key={pizza.id} value={pizza.title}>{pizza.title}</option>
                    ))}
                </select>
                        {/* selection of second half of pizza */}
                <select
                    value={secondHalf ? secondHalf.title : ""}
                    onChange={e => setSecondHalf(pizzas.find(p => p.title === e.target.value))}
                >
                    <option value="">Select a pizza for second half</option>
                    {pizzas.filter(pizza => !firstHalf || pizza.title !== firstHalf.title).map(pizza => (
                        <option key={pizza.id} value={pizza.title}>{pizza.title}</option>
                    ))}
                </select>

                        {/* price total */}
                <p>Selected Price: £{totalPrice.toFixed(2)}</p>

                        {/* checkout button */}
                <button 
                    type="submit" 
                    disabled={!firstHalf || !secondHalf || !selectedBase || !selectedSize}
                >
                    Create 50/50 Pizza
                </button>
            </form>
            {/* error handling */}
            {postError && <p>Error adding to checkout: {postError.message}</p>}
            {validationError && <p className="validation-error">{validationError}</p>}
        </div>
    );
}

export default Create;
