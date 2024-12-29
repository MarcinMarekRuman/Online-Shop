
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



            const showCartPopup = async (ID) => {
                try {
                    const response = await fetch(`http://localhost:3000/PopupProduct/${ID}`,{credentials: 'include'});

                    if (!response.ok) {
                        window.location.replace('/login');
                        alert('You must be logged in');
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
            const productData = await showCartPopup(ID);

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

            if(quantity !== '0')

            try {
                    const response = await fetch('http://localhost:3000/cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({productID, quantity}),
                    });

                    if (response.ok) {
                        console.log('Produkt został wysłany!');
                        setQuantity('0');
                        setHidden(false);
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
                            <div className="descriptionsOfProduct">
                                <h2 className='cardName'>{product.name}</h2>
                                <p className='cardDescription'>{product.description}</p>
                                <h3 className='cardPrice'>Price: ${product.price}</h3>
                                <button className='addCartButton' onClick={() => showPopup(product._id)}>
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
                {hidden && (<div className="addToCartPopup">

                        <form className='addToCartForm'>
                            <div className="productTile">
                                <img src={popupProduct.imageURL} alt={popupProduct.name}/>
                                <h2>{popupProduct.name}</h2>
                            <h2>Price: ${popupProduct.price}</h2>
                        </div>
                        <input type='hidden' value={productID}/>
                        <label className='addLabel'>Enter Quantity</label>
                        <input className='addInput' type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
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