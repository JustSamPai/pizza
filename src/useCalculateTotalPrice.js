import { useState, useEffect } from 'react';
//hook to calculate price, since this logic was repeated
const useCalculateTotalPrice = (selectedSize, sizes, selectedBase, bases, extraToppings) => {
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        //apply defaults 
        let sizePrice = 0;
        let basePrice = 0;
        let toppingsPrice = 0;
        //calcualtes sizes bases and extra toppings if applicable
        if (selectedSize && sizes) {
            const sizeObj = sizes.find((s) => s.id === selectedSize || s.size === selectedSize);
            sizePrice = sizeObj ? sizeObj.price : 0;
        }

        if (selectedBase && bases) {
            const baseObj = bases.find((b) => b.id === selectedBase || b.name === selectedBase);
            basePrice = baseObj ? baseObj.additionalCost : 0;
        }

        if (extraToppings) {
            toppingsPrice = extraToppings.length * 0.6;
        }
        //rounds to stop errors with decimal values being inaccurate
        const calculatedTotal = Math.round((sizePrice + basePrice + toppingsPrice) * 100) / 100;
        setTotalPrice(calculatedTotal);
    }, [selectedSize, sizes, selectedBase, bases, extraToppings]);

    return totalPrice;
};

export default useCalculateTotalPrice;
