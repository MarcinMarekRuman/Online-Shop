const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function quantityChange(req, res) {
    const { id, quantity } = req.body;
    const userID = req.user.userId

    try {
        const db = await connectDB();

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userID) },
            {
                $set: {
                    "cart.items.$[elem].quantity": parseInt(quantity)
                }
            },
            {
                arrayFilters: [{ "elem.productId": new ObjectId(id) }]
            }
        );


        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Product has been deleted from cart' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
}
module.exports = quantityChange;