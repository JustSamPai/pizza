import { Link } from "react-router-dom";
import useDropdown from "../useDropdown";
import { useSpring, animated } from 'react-spring';

const SideList = ({ sides }) => {
    sides = sides || [];
    const { isDropdownOpen, slideOut, toggleDropdown } = useDropdown(sides.length);
     //gets data (sides) from db.json

    if (!sides.length) {
        return null;
    }
            //includes some animations and pictures of the items
    return (
        <animated.div className="side-list">
            <button className="folder-button" onClick={toggleDropdown}>Sides</button>

            <animated.div className="dropdown-container" style={slideOut}>
                {sides.map(side => (
                    <div className="side-preview" key={side.id}>
                        <Link to={`/sides/${side.id}`}>
                        <img src={`images/sides/${side.id}.png`} alt=""></img>
                            <h2>{side.name}</h2>
                        </Link>
                    </div>
                ))}
            </animated.div>
        </animated.div>
    );
}
export default SideList;