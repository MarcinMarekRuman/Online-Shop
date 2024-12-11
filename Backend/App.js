const express = require('express')
const path = require('path');
const cors = require('cors');
const getProducts = require('./producsGet');
const connectDB = require("./dbConnection");
const productsAdd = require("./productsAdd");
const signUp = require("./signUp");
const auth = require("./auth");
const session = require("express-session");
const MongoSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const app = express();
const store = new MongoSession({
    uri: 'mongodb://127.0.0.1:27017',
    collection: 'sessions'
});



app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {maxAge: 1000 * 60 * 60 * 24}
    }));
app.use('/Media1', express.static(path.join(__dirname, 'Media1')));




app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const db = await connectDB();
    try {

        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('reqPassword:', password);
        console.log('dataBasePassword:', user.password);

        try {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                'yourSecretJWTKey',
                { expiresIn: '1h' }
            );
            req.session.user = user;

            return res.json({ token, userId: user._id });
        } catch (bcryptError) {
            return res.status(500).json({ message: 'Password comparison failed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



app.get('/cart', auth, (req, res) => {
    // Kod dostępu do koszyka, dostęp tylko dla zalogowanego użytkownika
    res.json({ message: 'Here is your cart!', userId: req.session.user._id });
});

app.post('/cart/add', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    const db = await connectDB();
    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(req.userId) });
        const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItemIndex = user.cart.items.findIndex(item => item.productId.toString() === productId);

        if (cartItemIndex >= 0) {
            user.cart.items[cartItemIndex].quantity += quantity;
        } else {
            user.cart.items.push({ productId: new ObjectId(productId), quantity });
        }

        await db.collection('users').updateOne(
            { _id: new ObjectId(req.userId) },
            { $set: { cart: user.cart } }
        );

        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/SignData', async (req, res) => {
    const { email, username, password } = req.body;
    const db = await connectDB();

    try {
        const existingUser = await db.collection('users').findOne({email});

        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({message: 'User already exists'});
        }

        const result = await signUp(email, username, password);


        console.log("Result Data", { email, username, password });
        res.status(201).json({ message: 'User registered', userId: result.insertedId });
    } catch (err) {
        console.error("Błąd:", err);
        res.status(500).json({ error: 'Server error' });
    }
});




app.post('/AddProduct', async (req, res) => {
    try {
        const { name,  description,price, imageURL } = req.body;

        console.log("Response Data:", { name, price, description, imageURL });



        const result = await productsAdd(name, description, price, imageURL);

        console.log(result);

        res.status(201).json();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: 'Error while product adding' });
    }
});

app.delete('/deleteProduct/:id', async (req, res) => {
    const { id } = req.params;

    console.log(id);

    try {
        const db = await connectDB();

        const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Product has been deleted' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

app.get('/PopupProduct/:id', async (req, res) => {
    const { id } = req.params;

    console.log(id);

    try {
        const db = await connectDB();

        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
        console.log(product);

        if (product) {
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});





app.get('/products', getProducts);



















app.listen(3000);