const connectDB = require("./dbConnection");
const signUp = require("./signUp");
const {ObjectId} = require("mongodb");


async function adminAccount(req, res) {
    const email = 'admin@admin';
    const username = 'Admin';
    const password = 'admin12';
    const db = await connectDB();

    try {
        const checkAdminExists = await db.collection('users').findOne({email});

        if (checkAdminExists) {
            await db.collection('users').updateOne(
                { _id: new ObjectId(checkAdminExists._id) },
                {
                    $set: {
                        "role": 'admin'
                    }
                }
            );
            return res.status(201).json({message: 'Admin account checked'});
        }
        else{
            const result = await signUp(email, username, password);


            await db.collection('users').updateOne(
                { _id: new ObjectId(result._id) },
                {
                    $set: {
                        "role": 'admin'
                    }
                }
            );
        }




        res.status(201).json({ message: 'Admin account checked'});
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = adminAccount;