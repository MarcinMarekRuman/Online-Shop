const connectDB = require("./dbConnection");
const bcrypt = require('bcryptjs');

async function signUp(email, username, password){
    try{
        const db = await connectDB();

        const hashedPassword = await bcrypt.hash(password, 12);

        return await db.collection(
                'users').insertOne(
                {
                    email: email,
                    username: username,
                    password: hashedPassword,
                    cart: {items: []},
                    createdAt: new Date()
                });
    }catch(err){
        console.log(err);
        throw err;
    }

}


module.exports = signUp;