const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function popupProduct(req, res){
    const { id } = req.params;


    try {
        const db = await connectDB();

        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

        if (product) {
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
}


module.exports = popupProduct;