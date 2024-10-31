const express = require('express')
const path = require('path');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());


app.get('/api/message', (req, res) =>{
    res.json({message: 'Hello from Express!'});
});

let products = [
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'https://example.com/product-image.jpg' },
    { id: 2, name: 'Cool Gadget', price: 49.99, description: 'This is a cool gadget!', imageUrl: 'https://example.com/gadget-image.jpg' },
    { id: 3, name: 'Useful Tool', price: 19.99, description: 'This is a useful tool!', imageUrl: 'https://example.com/tool-image.jpg' },
];


app.get('/api/products', (req, res) => {
    res.json(products);
});




app.listen(3000);