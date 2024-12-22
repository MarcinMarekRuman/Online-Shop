const connectDB = require("./dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    const {email, password} = req.body;
    const db = await connectDB();
    try {

        const user = await db.collection('users').findOne({email});
        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        try {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({message: 'Invalid email or password'});
            }

            const token = jwt.sign(
                {userId: user._id, email: user.email},
                'mySecretJWTKey',
                {expiresIn: '1h'}
            );
            req.session.user = user;

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
                sameSite: 'strict',
                loggedIn: true
            });

            return res.json({token, userId: user._id});
        } catch (bcryptError) {
            return res.status(500).json({message: 'Password comparison failed'});
        }
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = login;