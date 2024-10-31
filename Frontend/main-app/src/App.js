import './App.css';
import Header from "./Components/Header/Header.tsx";
import Home from './Components/Home.tsx'
import Products from './Components/Products.tsx'
import Orders from './Components/Orders.tsx'
import Register from './Components/Join.tsx'
import SignIn from './Components/SignIn.tsx'
import Admin from './Components/Admin.tsx'
import Footer from './Components/Footer/Footer.tsx'
import Cart from './Components/Cart.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {



  return (
    <Router>
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Products" element={<Products/>} />
                <Route path="/Orders" element={<Orders/>} />
                <Route path="/Admin" element={<Admin/>} />
                <Route path="/Join" element={<Register/>} />
                <Route path="/Login" element={<SignIn/>} />
                <Route path="/Cart" element={<Cart/>} />

            </Routes>


            <Footer/>
        </div>
    </Router>
  );
}

export default App;
