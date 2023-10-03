const BaseList = ({ bases, selectedBase, onBaseChange }) => {
    return (
        //gets data (bases) from db.json
        <div className="base-selection">
            <h3>Select a base:</h3>
            {bases.map(base => (
                <div key={base.id}>
                    <input 
                        type="radio" 
                        id={base.name} 
                        name="base" 
                        value={base.id} 
                        checked={selectedBase === base.id} 
                        onChange={() => onBaseChange(base.id)}
                    />
                    <label htmlFor={base.name}>{base.name} (£{base.price})</label>
                </div>
            ))}
        </div>
    );
};

export default BaseList;
