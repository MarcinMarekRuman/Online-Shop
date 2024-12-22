const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function cart (req, res) {
    const { productID, quantity } = req.body;


    const quantityToAdd = parseInt(quantity, 10);
    const userID = req.user.userId

    const db = await connectDB();
    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(userID) });
        const product = await db.collection('products').findOne({ _id: new ObjectId(productID) });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.cart) {
            user.cart = { items: [] };
        }

        const cartItemIndex = user.cart.items.findIndex(item => item.productId.toString() === productID.toString());

        if (cartItemIndex >= 0) {
            user.cart.items[cartItemIndex].quantity = parseInt(user.cart.items[cartItemIndex].quantity, 10) + quantityToAdd;
        } else {
            user.cart.items.push({ productId: new ObjectId(productID), quantity });
        }

        await db.collection('users').updateOne(
            { _id: new ObjectId(userID) },
            { $set: { cart: user.cart } }
        );


        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = cart;