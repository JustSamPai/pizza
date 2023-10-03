import { Link } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import useDropdown from "../useDropdown";


const PizzaList = ({ pizza }) => {
    const { isDropdownOpen, slideOut, toggleDropdown } = useDropdown(pizza.length);
     //gets data (pizzas) from db.json

    // Fade in animation for the folder
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    });
    
        //includes some animations and pictures of the items
    return (
        <animated.div className="pizza-list" style={fadeIn}>
            <button className="folder-button" onClick={toggleDropdown}>Pizzas</button>

            <animated.div className="dropdown-container" style={slideOut}>
                {pizza && pizza.map((pizzaItem) => (
                    <div className="pizza-preview" key={pizzaItem.id}>
                       {/* <img src={pizzaItem.imageUrl} alt={pizzaItem.title} className="pizza-image" /> */}
                       <img src={`images/${pizzaItem.id}.png`} alt=""></img>

                        <Link to={`/pizza/${pizzaItem.id}`}>
                            <h2>{pizzaItem.title}</h2>
                            <p>{pizzaItem.diet}</p>
                        </Link>
                    </div>
                ))}
            </animated.div>
        </animated.div>
    );
}

export default PizzaList;
