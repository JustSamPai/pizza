import React from 'react';
import PizzaList from "../PizzaList/PizzaList";
import SideList from "../PizzaList/SideList";
import BeverageList from "../PizzaList/BevList";
import useFetch from "../useFetch";
import { useState } from "react";
import { useSpring, animated } from 'react-spring';

const Home = () => {
    // useFetch hook to get data from my db.json with the respective catagories
    const { data: pizza, isLoading: pizzaLoading, error: pizzaError } = useFetch('http://localhost:8000/pizza');
    const { data: sides, isLoading: sidesLoading, error: sidesError } = useFetch('http://localhost:8000/sides/');
    const { data: beverages, isLoading, error } = useFetch('http://localhost:8000/beverages');

    // state for folders to check if they have been clicked
    const [isOpen, setIsOpen] = useState(false);

    //changes the state to toggle the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    //fade animation
    const fade = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    });

    //error checks to prevent issues with refreshing the page, or return any unexpected outputs
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    
    return (
        //fade animation for items and folders
        <animated.div className="home" style={fade}>
            {pizzaError && <div>{pizzaError}</div>}
            {pizzaLoading && <div>Loading pizzas...</div>}
            {pizza && <PizzaList pizza={pizza} />}

            {sidesError && <div>{sidesError}</div>}
            {sidesLoading && <div>Loading sides...</div>}
            {sides && <SideList sides={sides} />}
            
            {beverages && <BeverageList beverages={beverages}/>}
        </animated.div>
    );
}

export default Home;
