import '../styles/OrderCreate.css'
import {useEffect, useState} from "react";
const OrderCreate = () =>{

    const [inOrderProducts, setInOrderProducts] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [acceptInput, setAcceptInput] = useState('');


    useEffect(() => {
        const fetchOrderProducts = async () => {

            try {
                const response = await fetch('http://localhost:3000/OrderCreate' , {credentials: 'include'});
                if (!response.ok) {
                    console.log('No response');
                    return;
                }
                const data = await response.json();
                setInOrderProducts(data);

                let temporaryPrice = 0;
                for(const item of data){
                    temporaryPrice += ((parseFloat(item.price) * parseInt(item.quantity)));
                    console.log(temporaryPrice);
                }
                setTotalPrice(parseFloat(temporaryPrice.toFixed(2)));


            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        }
        fetchOrderProducts();
    },[]);

    if (!inOrderProducts) return <div>Loadding...</div>;
    if(inOrderProducts.message) return <div>You are not logged in!</div>;


        const sendOrder = async () => {

            if (acceptInput.toLowerCase() !== "accept") {
                alert('Please type "Accept" to confirm your order.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/OrderSend',{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',
                }
                });
                console.log(response);
                if (!response.ok) {
                    console.log('No response');
                }

                window.location.replace('/cart');
            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        };



    return(
        <div className='OrderCreate-Container'>
            <div className='OrdersCreate-List'>
                {inOrderProducts.map((product) => (

                    <div key={product.id} className="orderCreateItem">
                        <img src={product.imageURL} alt={product.name} className="product-image"/>
                        <h4>{product.name}</h4>
                        <h4>Price: ${product.price}</h4>
                        <button onClick={() => {
                            sendOrder()
                        }}>Delete
                        </button>
                    </div>
                ))}
                <p>Total price: ${totalPrice}</p>
                <form className="AcceptForm" onSubmit={(e) => { e.preventDefault(); sendOrder(); }}>
                    <label>If you are accepting summary, type word "Accept" below and press button Accept</label>
                    <input
                        type='text'
                        value={acceptInput}
                        onChange={(e) => setAcceptInput(e.target.value)}
                    />
                    <button type='submit'>Accept</button>
                </form>
            </div>

        </div>
    )
}


export default OrderCreate;