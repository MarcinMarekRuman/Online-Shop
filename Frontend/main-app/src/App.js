import './App.css';
// import React,{useState, useEffect} from "react";
import Header from "./Components/Header/Header.tsx";
import Home from './Components/Home/Home.tsx'
import Products from './Components/Products/Products.tsx'
import Orders from './Components/Orders/Orders.tsx'
import Register from './Components/Login/Join.tsx'
import SignIn from './Components/Login/SignIn.tsx'
import Admin from './Components/Admin/Admin.tsx'
import Footer from './Components/Footer/Footer.tsx'
import Cart from './Components/Cart/Cart.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
    // const [message, setMessage] = useState('');


    // useEffect(() => {
    //     const fetchMessage = async () => {
    //         try {
    //             const response = await fetch('http://localhost:3000/api/message');
    //             if (!response.ok) {
    //                 throw new Error('Error');
    //             }
    //             const data = await response.json();
    //             setMessage(data);
    //
    //         } catch (error) {
    //             console.error('Error fetching header content:', error);
    //         }
    //     };
    //     fetchMessage();
    // }, []);
    //
    //
    // console.log(message);


  return (
    <Router>
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Products" element={<Products/>} />
                <Route path="/Orders" element={<Orders/>} />
                <Route path="/Admin" element={<Admin/>} />
                <Route path="/Register" element={<Register/>} />
                <Route path="/Login" element={<SignIn/>} />
                <Route path="/Cart" element={<Cart/>} />

            </Routes>


            <Footer/>
        </div>
    </Router>
  );
}

export default App;
