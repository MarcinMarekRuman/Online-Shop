// import ProductsAdd from './ProductsAdd';

import {useEffect, useState} from "react";






    const Products = () => {

        const [products, setProducts] = useState([]);

        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/products');
                    console.log('gej');
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
                <h3>Zapoznaj się z naszą ofertą</h3>
                <div className="products-container">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl} alt={product.name} className="product-image"/>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <h3>Price: ${product.price}</h3>
                        </div>
                    ))};
                </div>

            </div>

        )
    }


export default Products;