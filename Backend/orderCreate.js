const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function orderCreate(req, res){
    const userID = req.user.userId
    const db = await connectDB();

    try {
        const user = await db.collection('users').findOne({_id: new ObjectId(userID)});

        const userCart = await user.cart.items;

        const cartItems = [];


        for (const item of user.cart.items) {
            const product = await db.collection('products').findOne({ _id: new ObjectId(item.productId) });

            if (product) {

                cartItems.push({
                    ...product,
                    quantity: item.quantity
                });
            }
        }


        if (!user || !user.cart) {
            return res.status(404).json({ message: 'Your cart is empty!' });
        }

        console.log('UserCart:  ',userCart);
        if (!userCart) {
            res.status(401).json({ message: 'User not found' });
        }

        if(cartItems === null || cartItems === undefined) {
            res.status(200).json({ message: 'Your Cart is empty!' });
        }

        res.status(200).json(cartItems);
    }
    catch (err){
        res.status(500).json({ message: 'You are not logged in!' });
    }
}

module.exports = orderCreate;