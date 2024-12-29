import '../styles/UserOrders.css'
import {useEffect, useState} from "react";
const UserOrders = () =>{

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/userOrders',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    setOrders([]);
                }
                const data = await response.json();

                const flattenedOrders = data.flat();
                setOrders(flattenedOrders);
            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        };
        fetchOrders();
    }, []);

    if (orders.length === 0) {
        return <div>Orders Are Empty!</div>;
    }



    return(
        <div className='Orders-Container'>
            <div className='Orders-List'>
                {orders.map((ord) => (

                    <div key={ord.id} className="orders-card">
                        <p className='orderID'>Product: {ord.productId}</p>
                        <p className='userID'>Quantity: {ord.quantity}</p>

                    </div>
                ))}

            </div>

        </div>
    )
}
export default UserOrders;