
import { useState } from 'react';
import { useSpring } from 'react-spring';
// for animation, not currently used
const useDropdown = (listLength) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const slideOut = useSpring({
        height: isDropdownOpen ? (listLength * 60) + 'px' : '0px',
        opacity: isDropdownOpen ? 1 : 0,
    });

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return { isDropdownOpen, slideOut, toggleDropdown };
}

export default useDropdown;
