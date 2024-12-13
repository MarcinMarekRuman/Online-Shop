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
const cookieParser =  require('cookie-parser');

const app = express();
const store = new MongoSession({uri: 'mongodb://127.0.0.1:27017', collection: 'sessions'});



app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true  }));

app.use(cookieParser());
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
            sameSite: 'strict'
        }
    }));
app.use('/Media1', express.static(path.join(__dirname, 'Media1')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


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
                'mySecretJWTKey',
                { expiresIn: '1h' }
            );
            req.session.user = user;

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
                sameSite: 'strict',
                loggedIn: true
            });

            return res.json({ token, userId: user._id });
        } catch (bcryptError) {
            return res.status(500).json({ message: 'Password comparison failed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const authenticateUser = (req, res, next) => { //to idzie do pliku auth
    const token = req.cookies.token;
    console.log("Token from cookies:", token);

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'mySecretJWTKey');
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};



app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('token');
        return res.json({ message: 'Logged out successfully' });
    });
});


app.get('/orders', authenticateUser, async (req, res) => {
    const userID = req.user.userId
    console.log('UserID:', userID)
    const db = await connectDB();

    try {
        const orders = await db.collection('orders').find({}).toArray();
        console.log(orders);

        res.status(200).json(orders);
    }
    catch (err){
        res.status(500).json({ message: 'You are not logged in!' });
    }
});


app.get('/cart', authenticateUser, async (req, res) => {
    const userID = req.user.userId
    console.log('UserID:', userID)
    const db = await connectDB();

    try {
        const user = await db.collection('users').findOne({_id: new ObjectId(userID)});
        console.log(user);
        const userCart = await user.cart.items;

        const cartItems = [];


        for (const item of user.cart.items) {
            const product = await db.collection('products').findOne({ _id: new ObjectId(item.productId) });

            if (product) {

                cartItems.push({
                    ...product,
                    quantity: item.quantity
                });
            }
        }

        console.log('CartItems' , cartItems);

        if (!user || !user.cart) {
            return res.status(404).json({ message: 'Your cart is empty!' });
        }

        console.log('UserCart:  ',userCart);
        if (!userCart) {
            res.status(401).json({ message: 'User not found' });
        }

        if(cartItems === null || cartItems === undefined) {
            res.status(200).json({ message: 'Your Cart is empty!' });
        }

        res.status(200).json(cartItems);
    }
    catch (err){
        res.status(500).json({ message: 'You are not logged in!' });
    }
});

app.get('/OrderCreate', authenticateUser, async (req, res) => {
    const userID = req.user.userId
    console.log('UserID:', userID)
    const db = await connectDB();

    try {
        const user = await db.collection('users').findOne({_id: new ObjectId(userID)});
        console.log(user);
        const userCart = await user.cart.items;

        const cartItems = [];


        for (const item of user.cart.items) {
            const product = await db.collection('products').findOne({ _id: new ObjectId(item.productId) });

            if (product) {

                cartItems.push({
                    ...product,
                    quantity: item.quantity
                });
            }
        }

        console.log('CartItems' , cartItems);

        if (!user || !user.cart) {
            return res.status(404).json({ message: 'Your cart is empty!' });
        }

        console.log('UserCart:  ',userCart);
        if (!userCart) {
            res.status(401).json({ message: 'User not found' });
        }

        if(cartItems === null || cartItems === undefined) {
            res.status(200).json({ message: 'Your Cart is empty!' });
        }

        res.status(200).json(cartItems);
    }
    catch (err){
        res.status(500).json({ message: 'You are not logged in!' });
    }
});



app.post('/OrderSend', authenticateUser, async (req, res, next) => {

    const userID = req.user.userId;

    const temporaryOrder = [];

    const db = await connectDB();
    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(userID) });
        // const product = await db.collection('products').findOne({ _id: new ObjectId(productID) });




        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.orders) {
            user.orders = { items: [] };
        }

        if(user.cart.items !== []){
            for (const item of user.cart.items) {
                temporaryOrder.push(item);
            }

            console.log(temporaryOrder);
            await db.collection('users').updateOne(
                { _id: new ObjectId(userID) },
                { $push: {
                        'orders.items': temporaryOrder } }
            );

            await db.collection('orders').insertOne(
                {
                    userID: user._id,
                    order: temporaryOrder
                }
            );

            await db.collection('users').updateOne(
                { _id: new ObjectId(userID) },
                { $set: {'cart.items': [] } }
            );

        }


        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/cart/add', authenticateUser, async (req, res, next) => {
        const { productID, quantity } = req.body;

        const quantityToAdd = parseInt(quantity, 10);
        const userID = req.user.userId

        console.log(productID);
        console.log(quantity);
        console.log(userID)
        const db = await connectDB();
        try {
            const user = await db.collection('users').findOne({ _id: new ObjectId(userID) });
            const product = await db.collection('products').findOne({ _id: new ObjectId(productID) });

            console.log(product);
            console.log(user);

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
    });

app.delete('/cartDelete/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const userID = req.user.userId

    console.log(id);
    console.log(userID);

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
});

app.post('/quantity', authenticateUser, async (req, res, next) => {
    const { id, quantity } = req.body;
    const userID = req.user.userId

    try {
        const db = await connectDB();

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userID) },
            {
                $set: {
                    "cart.items.$[elem].quantity": parseInt(quantity)
                }
            },
            {
                arrayFilters: [{ "elem.productId": new ObjectId(id) }]
            }
        );


        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Product has been deleted from cart' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
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

app.post('/adminAccount', async (req, res) => {
    const email = 'admin@admin';
    const username = 'Admin';
    const password = 'admin12';
    const db = await connectDB();

    try {
        const checkAdminExists = await db.collection('users').findOne({email});

        if (checkAdminExists) {
            return res.status(201).json({message: 'Admin account checked'});
        }
        else{
            const result = await signUp(email, username, password);


            await db.collection('users').updateOne(
                { _id: new ObjectId(checkAdminAdd._id) },
                {
                    $set: {
                        "role": 'admin'
                    }
                }
            );
        }




        res.status(201).json({ message: 'Admin account checked'});
    } catch (err) {
        console.error("Błąd:", err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/userCheck', authenticateUser ,async(req, res) => {

    const db = await connectDB();
    const userID = req.user.userId;

    console.log(userID);

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

app.get('/PopupProduct/:id', authenticateUser, async (req, res) => {
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