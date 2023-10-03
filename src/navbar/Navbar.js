import { Link } from 'react-router-dom';
// simple nav bar to include redirections to other pages
const Navbar = () => {
    return ( 
        
        <nav className="navbar">
            <Link to="/">
            <img
                src="logo202.png"
                alt=""
                style={{
                    width: '100px',
                    height: '80px',
                    borderRadius: '10px'
                }}
            />
            </Link>
           
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/checkout">Checkout</Link>
                <Link to="/create" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: '8px'
                }}>Create your own pizza</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;