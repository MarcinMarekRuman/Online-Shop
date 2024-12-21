import '../styles/Orders.css'
import {useEffect, useState} from "react";
const Orders = () =>{

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                console.log(response);
                if (!response.ok) {
                    console.log('No response');
                }
                const data = await response.json();
                console.log(data);
                setOrders(data);
            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        };
        fetchOrders();
    }, []);

    if (!orders){
        return <div>Orders Are Empty</div>;
    }


    return(
        <div className='Orders-Container'>
            <div className='Orders-List'>
                {orders.map((ord) => (

                    <div key={ord.id} className="orders-card">
                        <p className='orderID'>OrderID: {ord._id}</p>
                        <p className='userID'>UserID: {ord.userID}</p>
                        <p className='itemQuantity'>Item Quantity: {ord.order.length}</p>

                    </div>
                ))}

            </div>

        </div>
    )
}



export default Orders;