const connectDB = require("./dbConnection");


async function orders(req,res,next){
    const db = await connectDB();

    try {
        const orders = await db.collection('orders').find({}).toArray();

        res.status(200).json(orders);
    }
    catch (err){
        res.status(500).json({ message: 'You are not logged in!' });
        next();
    }
}

module.exports = orders;