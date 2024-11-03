
import {useEffect, useState} from "react";
import '../styles/Products.css';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";



    const Products = () => {

        const [products, setProducts] = useState([]);

        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await fetch('http://localhost:3000/products');
                    console.log(response);
                    if (!response.ok) {
                        throw new Error('Error');
                    }
                    const data = await response.json();
                    setProducts(data);
                } catch (error) {
                    console.error('Error fetching header content:', error);
                }
            };
            fetchProducts();
        }, []);

        if (!products) return null;

        console.log(products);
        return (
            <div className="products-container">
                <h3 className='products-text'>Zapoznaj się z naszą ofertą</h3>

                    <div className="products-box">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.imageURL} alt={product.name} className="product-image"/>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <h3>Price: ${product.price}</h3>
                                <div className='product-buttons'>
                                    <a href='/ProductsAdd' className='product-button'> <FiEdit /></a>
                                    <a href='/PrductsAdd' className='product-button'><RiDeleteBin6Line /> </a>
                                </div>
                            </div>
                        ))}


                    </div>

            </div>

        )
    }


export default Products;