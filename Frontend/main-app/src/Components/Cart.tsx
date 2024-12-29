import {useEffect, useState} from 'react';
import '../styles/Cart.css';
import { FaTrashCan } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";




const Cart = () =>{

    const [inCartProducts, setInCartProducts] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [finalPrice, setFinalPrice] = useState(0);


    useEffect(() => {
        const fetchCartProducts = async () => {

            try {
                const response = await fetch('http://localhost:3000/cart' , {credentials: 'include'});
                if (!response.ok) {
                    console.log('No response');
                    return;
                }
                const data = await response.json();
                setInCartProducts(data);

                let temporaryPrice = 0;
                for(const item of data){
                    temporaryPrice += ((parseFloat(item.price) * parseInt(item.quantity)));
                    console.log(temporaryPrice);
                }
                setFinalPrice(parseFloat(temporaryPrice.toFixed(2)));


            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        }
        fetchCartProducts();
    },[]);





    if (!inCartProducts) return <div>Loading...</div>;
    if (!inCartProducts.length) return <div>Your cart is empty</div>;
    if(inCartProducts.message) return <div>You are not logged in!</div>;




    const cartDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/cartDelete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                console.log(`Produkt o ID ${id} został usunięty!`);
            } else {
                console.log('Błąd podczas usuwania produktu');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
        window.location.reload();
    };

    const quantityChange = async (id, quantity) => {
        try{
            const response = await fetch(`http://localhost:3000/quantity`,{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id, quantity })
                });
            if (response.ok) {
                console.log('Quantity updated');
            }
        }
        catch (err){
            console.log(err)
        }
    }

    const orderCreate = () =>{
        window.location.replace('/OrderCreate')
    }






    return(

        <div className="cartContainer">

            <div className="cartProductList">
                {inCartProducts.map((product) => (

                    <div key={product.id} className="cartProduct">
                        <img src={product.imageURL} alt={product.name} className="cartImage"/>
                        <h4>{product.name}</h4>
                        <h4>Price: ${product.price}</h4>
                        <form className="quantityForm">
                            <input type={"number"}
                                   min="0"
                                   max="20"
                                   placeholder={product.quantity}
                                   value={quantity}
                                   onChange={(e) => setQuantity(e.target.value)}
                                   className="quantityInput"
                            />
                            <button className="quantityChangeBtn"
                                    onClick={()=>{quantityChange(product._id, quantity)}}
                            >CHANGE</button>
                        </form>


                            <button className="cartDeleteButton" onClick={() => {
                                cartDelete(product._id)
                            }}>
                                <FaTrashCan/>
                            </button>

                    </div>

                ))}
            </div>

            <div className="rightSide">
                <div className="cartSummary">
                    <p className="priceSummaryText">
                        Final Cost
                    </p>
                    <div className="priceSummary">

                        <p className='costSummarySymbol'>
                            <RiMoneyDollarCircleLine/>
                        </p>
                        <p className='costSummaryPrice'>
                            {finalPrice}
                        </p>
                    </div>
                    <button className='orderButton' onClick={orderCreate}>ORDER</button>
                </div>
            </div>
        </div>

    )
}


export default Cart;