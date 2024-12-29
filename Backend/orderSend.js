const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function orderSend(req,res) {
    const userID = req.user.userId;

    const temporaryOrder = [];

    const db = await connectDB();
    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(userID) });


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.orders) {
            user.orders = { items: [] };
        }

        if(user.cart.items !== []){
            for (const item of user.cart.items) {
                temporaryOrder.push(item);
            }

            await db.collection('users').updateOne(
                { _id: new ObjectId(userID) },
                { $push: {
                        'orders.items': temporaryOrder } }
            );

            await db.collection('orders').insertOne(
                {
                    userID: user._id,
                    order: temporaryOrder
                }
            );

            await db.collection('users').updateOne(
                { _id: new ObjectId(userID) },
                { $set: {'cart.items': [] } }
            );

        }


        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = orderSend;