const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function cartDelete(req, res) {
    const { id } = req.params;
    const userID = req.user.userId

    try {
        const db = await connectDB();

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userID) },
            { $pull: { "cart.items": { productId: new ObjectId(id) } } }
        );


        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Product has been deleted from cart' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
}


module.exports = cartDelete;