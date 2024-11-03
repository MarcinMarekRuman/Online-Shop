const express = require('express')
const path = require('path');
const cors = require('cors');
const getProducts = require('./producsGet');
const connectDB = require("./dbConnection");
const productsAdd = require("./productsAdd");

const app = express();




app.use(express.json());
app.use(cors());
app.use('/Media1', express.static(path.join(__dirname, 'Media1')));







app.post('/AddProduct', async (req, res) => {
    try {
        const { name,  description,price, imageURL } = req.body;

        console.log("Otrzymane dane:", { name, price, description, imageURL });

        // Połącz się z MongoDB (jeśli używasz MongoDB)
        const db = await connectDB();


        const result = await productsAdd(name, description, price, imageURL);


        res.status(201).json();
    } catch (err) {
        console.error("Błąd:", err);
        res.status(500).json({ error: 'Błąd podczas dodawania produktu do bazy danych' });
    }
});




app.get('/products', getProducts);



















app.listen(3000);