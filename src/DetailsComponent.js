const DetailsComponent = ({ item, children }) => {
    if (!item) return null;
  
    return (
      <article>
        <h2>{item.title}</h2>
        <p>{item.description}</p> 
        <div>{item.body}</div>
        {children}
      </article>
    );
  };
  
  export default DetailsComponent;
  