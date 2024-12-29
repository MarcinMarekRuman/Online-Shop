const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function userOrders(req,res,next){
    const db = await connectDB();
    const userID = req.user.userId

    try {
        const user = await db.collection('users').findOne({_id: new ObjectId(userID)});


        if (!user || !user.orders || !Array.isArray(user.orders.items)) {
            return res.status(400).json({ message: 'Orders not found or are not an array' });
        }

        const orders = user.orders.items;


        res.status(200).json(orders);
    }
    catch (err){
        res.status(500).json({ message: 'You are not logged in!' });
        next();
    }
}

module.exports = userOrders;