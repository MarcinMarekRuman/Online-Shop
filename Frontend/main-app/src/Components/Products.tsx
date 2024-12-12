
import {useEffect, useState} from "react";
import '../styles/Products.css';



    const Products = () => {

        const [products, setProducts] = useState([]);
        const [popupProduct, setPopupProduct] = useState(null);
        const [hidden, setHidden] = useState(false);
        const [quantity, setQuantity] = useState('');
        const [productID, setProductID] = useState(null);




        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await fetch('http://localhost:3000/products');
                    console.log(response);
                    if (!response.ok) {
                        console.log('No response');
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



            const showCart = async (ID) => {
                try {
                    const response = await fetch(`http://localhost:3000/PopupProduct/${ID}`);

                    if (!response.ok) {
                        console.log('error');
                    }

                    const data = await response.json();
                    setPopupProduct(data);

                    console.log("Data from front", data);
                    return data;
                } catch (error) {
                    console.error('Error:', error);
                }
            };



        const hiddenPopup = () => {
            setHidden(false);
        };

        const showPopup= async (ID) =>{
            const productData = await showCart(ID);

            if (productData) {
                setProductID(productData._id);
                setHidden(true);
            } else {
                return;
            }

        }



        const addToCart = async (e) => {
            e.preventDefault();

            console.log("productID:", productID);
            console.log("quantity:", quantity);

            try {
                    const response = await fetch('http://localhost:3000/cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({productID, quantity}),
                    });

                    if (response.ok) {
                        console.log('Produkt został wysłany!');
                        setHidden(true);
                    } else {
                        console.log('Błąd podczas wysyłania produktu');
                    }
                } catch (error) {
                    console.error('Wystąpił błąd:', error);
                }

        };




        return (
            <div className="products-container">
                <h3 className='products-text'>Ours Offer</h3>

                <div className="products-box">
                    {products.map((product) => (

                        <div key={product.id} className="product-card">
                            <img src={product.imageURL} alt={product.name} className="product-image"/>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <h3>Price: ${product.price}</h3>
                            <button className='product-button' onClick={() => showPopup(product._id)}>
                               CLICK </button>
                        </div>
                    ))}

                </div>
                {hidden && (<div className="addToCartPopup">

                    <form>
                        <div className="productTile">
                            <img src={popupProduct.imageURL} alt={popupProduct.name}/>
                            <h2>{popupProduct.name}</h2>
                            <h2>Price: ${popupProduct.price}</h2>
                        </div>
                        <input type='hidden' value={productID}/>
                        <label>Quantity</label>
                        <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                        <div className="addButtons">
                            <button className="addCartButton" onClick={addToCart}>
                             Confirm
                            </button>
                            <button onClick={hiddenPopup}
                                    className="addCartButton"> Cancel
                            </button>
                        </div>
                    </form>

                    </div>
                    )}
            </div>

        )
    }


export default Products;