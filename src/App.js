import Navbar from './navbar/Navbar';
import Home from './home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import PizzaDetails from './PizzaDetails';
import Checkout from './Checkout';
import SideDetails from './SideDetails';
import BeverageDetails from './BevDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/pizza/:id" element={<PizzaDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/sides/:id" element={<SideDetails />} />
            <Route path="/beverages/:id" element={<BeverageDetails />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
