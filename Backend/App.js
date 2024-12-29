const express = require('express')
const path = require('path');
const cors = require('cors');
const adminAccount = require('./adminAccount.js');
const userCheck = require('./userCheck.js');
const login = require('./login.js');
const logout = require('./logout.js');
const signData = require('./signData.js');
const getProducts = require('./producsGet.js');
const quantityChange = require('./quantityChange.js');
const orders = require('./orders.js');
const userOrders = require('./userOrders.js');
const orderCreate = require('./orderCreate.js');
const orderSend = require('./orderSend.js');
const cart = require('./cart.js');
const cartAdd = require('./cartAdd.js');
const cartDelete = require('./cartDelete.js');
const editProduct = require('./editProduct.js');
const productsAdd = require("./productsAdd.js");
const productDelete = require("./productDelete.js");
const popupProduct = require('./popupProduct.js');
const session = require("express-session");
const authenticateUser = require("./authenticateUser.js");
const MongoSession = require('connect-mongodb-session')(session);
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

app.get('/products', getProducts);
app.post('/login', login);
app.post('/logout', logout);
app.get('/orders', authenticateUser ,orders);
app.get('/userOrders', authenticateUser ,userOrders);
app.get('/cart', authenticateUser, cart);
app.get('/OrderCreate', authenticateUser, orderCreate);
app.post('/OrderSend', authenticateUser, orderSend);
app.post('/cart/add', authenticateUser, cartAdd);
app.delete('/cartDelete/:id', authenticateUser, cartDelete);
app.post('/quantity', authenticateUser, quantityChange);
app.post('/SignData', signData);
app.post('/adminAccount', adminAccount);
app.post('/userCheck', authenticateUser, userCheck);
app.post('/AddProduct', productsAdd);
app.delete('/deleteProduct/:id', productDelete);
app.get('/PopupProduct/:id', authenticateUser, popupProduct);
app.post('/editProduct/:id', authenticateUser, editProduct);


app.listen(3000);





























