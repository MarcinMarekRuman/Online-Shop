import './App.css';
import Header from "./Components/Header/Header.tsx";
import Home from './Components/Home.tsx'
import Products from './Components/Products.tsx'
import Orders from './Components/Orders.tsx'
import OrderCreate from './Components/OrderCreate.tsx'
import UserOrders from './Components/UserOrders.tsx'
import Register from './Components/Join.tsx'
import SignIn from './Components/SignIn.tsx'
import Admin from './Components/Admin.tsx'
import Footer from './Components/Footer/Footer.tsx'
import Cart from './Components/Cart.tsx'
import ProductsAdd from './Components/ProductsAdd.tsx'
import FAQ from './Components/FAQ.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useEffect, useState} from "react";


function App() {

    const [res, setRes] = useState({});
    useEffect(() => {
        const AdminCheck = async () => {

                const response = await fetch('http://localhost:3000/adminAccount',{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setRes(await response.json());
        };
        AdminCheck();
    },[])


    if(!res || res)



  return (
    <Router>
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Products" element={<Products/>} />
                <Route path="/Orders" element={<Orders/>} />
                <Route path="/Admin" element={<Admin/>} />
                <Route path="/Join" element={<Register/>} />
                <Route path="/Login" element={<SignIn/>} />
                <Route path="/Cart" element={<Cart/>} />
                <Route path="/ProductsAdd" element={<ProductsAdd/>} />
                <Route path="/UserOrders" element={<UserOrders/>} />
                <Route path="/OrderCreate" element={<OrderCreate/>} />
                <Route path="/faq" element={<FAQ/>} />
            </Routes>


            <Footer/>
        </div>
    </Router>
  );
}

export default App;
