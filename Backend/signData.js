const connectDB = require("./dbConnection");
const signUp = require("./signUp");


async function signData(req, res) {
    const { email, username, password } = req.body;
    const db = await connectDB();

    try {
        const existingUser = await db.collection('users').findOne({email});

        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const result = await signUp(email, username, password);

        res.status(201).json({ message: 'User registered', userId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = signData;