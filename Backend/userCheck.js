const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function userCheck(req, res) {
    const db = await connectDB();
    const userID = req.user.userId;


    if (!userID) {
        return res.status(401).json({ userData: null});
    }

    try {
        const userData = await db.collection('users').findOne({ _id: new ObjectId(userID) });

        if (!userData) {
            return res.status(404).json({ userData: null});
        }

        res.status(200).json({ userData });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = userCheck;