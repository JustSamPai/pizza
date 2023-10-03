const SizeList = ({ sizes, selectedSize, onSizeChange }) => {
    // If sizes is undefined or null, default it to an empty array
    sizes = sizes || [];

    // Only display the component if sizes data is available.
    if (!sizes.length) {
        return null; // or return a loading message or any other placeholder
    }
    //gets data for sides
    return (
        <div className="size-list">
            <label>Select size:</label>
            <select value={selectedSize} onChange={e => onSizeChange(Number(e.target.value))}>
                <option value="">Select size</option>
                {sizes.map(size => (
                    <option key={size.id} value={size.id}>
                        {size.size} - £{size.price}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SizeList;
