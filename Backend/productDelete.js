const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function productDelete(req, res) {
    const { id } = req.params;

    try {
        const db = await connectDB();

        const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Product has been deleted' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = productDelete;