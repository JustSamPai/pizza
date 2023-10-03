import React from 'react';
import { useSpring, animated } from 'react-spring';
import useDropdown from "../useDropdown";

const ToppingList = ({ toppings = [], selectedToppings, onToppingChange }) => {
    
    // Ensuring that toppings.length is defined and is a number
    const toppingsLength = Array.isArray(toppings) ? toppings.length : 0;
    
    const { isDropdownOpen, slideOut, toggleDropdown } = useDropdown(toppingsLength);
    
    // Fade in animation for the folder
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    });

    // If toppings or selectedToppings is not available, render a loading component
    if (!toppings || !selectedToppings) {
        return <div>loading ...</div>
    }

    // Ensure toppings is an array before mapping over it
    const renderedToppings = Array.isArray(toppings) ? (
        toppings.map((topping) => (
            <div className="topping-preview" key={topping.id}>
                <button 
                    className={`topping-button ${selectedToppings.includes(topping.id) ? 'selected' : ''}`}
                    onClick={() => onToppingChange(topping.id)}
                >
                    {topping.name}
                </button>
            </div>
        ))
    ) : null;
        
    return (
        <animated.div className="topping-list" style={fadeIn}>
            <button className="folder-button" onClick={toggleDropdown}>Toppings</button>

            <animated.div className="dropdown-container" style={slideOut}>
                {renderedToppings}
            </animated.div>
        </animated.div>
    );
}

export default ToppingList;
