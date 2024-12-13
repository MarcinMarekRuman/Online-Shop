import {useEffect, useState} from 'react';




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





    if (!inCartProducts) return <div>Loadding...</div>;
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

            {inCartProducts.map((product) => (

                <div key={product.id} className="product-card">
                    <img src={product.imageURL} alt={product.name} className="product-image"/>
                    <h4>{product.name}</h4>
                    <h4>Price: ${product.price}</h4>
                    <form>
                        <input type={"number"}
                               min="0"
                               max="20"
                               placeholder={product.quantity}
                               value={quantity}
                               onChange={(e) => setQuantity(e.target.value)}
                               className="quantityInput"
                        />
                        <button className={"quantityChangeBtn"}
                        onClick={()=>{quantityChange(product._id, quantity)}}
                        >Change quantity</button>
                    </form>

                    <button onClick={()=>{cartDelete(product._id)}}>Delete</button>
                </div>

            ))}

            <div className="cartSummary">
                <p className='costSummary'>${finalPrice}</p>
                <button className='orderButton' onClick={orderCreate}>Order</button>
            </div>
        </div>

    )
}


export default Cart;