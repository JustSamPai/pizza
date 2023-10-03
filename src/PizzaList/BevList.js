import { Link } from "react-router-dom";
import useDropdown from "../useDropdown";
import { useSpring, animated } from 'react-spring';


const BeverageList = ({ beverages }) => {
     //gets data (beverages) from db.json
    beverages = beverages || [];
    const { isDropdownOpen, slideOut, toggleDropdown } = useDropdown(beverages.length);

    if (!beverages.length) {
        return null;
    }

    return (
        //includes some animations and pictures of the items
        <animated.div className="beverage-list">
            <button className="folder-button" onClick={toggleDropdown}>Beverages</button>

            <animated.div className="dropdown-container" style={slideOut}>
                {beverages.map(beverage => (
                    <div className="beverage-preview" key={beverage.id}>
                        <Link to={`/beverages/${beverage.id}`}>
                        <img src={`images/bev/${beverage.id}.png`} alt=""></img>
                            <h2>{beverage.name}</h2>
                           
                            <p>Price: £{beverage.price.toFixed(2)}</p>
                        </Link>
                    </div>
                ))}
            </animated.div>
        </animated.div>
    );
}


export default BeverageList;
