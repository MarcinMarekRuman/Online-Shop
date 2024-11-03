const express = require('express')
const path = require('path');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json());
app.use(cors());



const dbname = 'SzelestDataBase';

async function processDB(){
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url);
    try{
        await client.connect();
        const dbList = await client.db().admin().listDatabases();

        console.log('Databases:');
        dbList.databases.forEach( db => console.log(db.name));
    }
    catch (err){
        console.error(err);
    }
    finally {
        await client.close();
    }


}

processDB();







app.get('/api/message', (req, res) =>{
    res.json({message: 'Hello from Express!'});
});

app.use('/Media1', express.static(path.join(__dirname, 'Media1')));



let products = [
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/NIKEAIRFORCE.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/AIRFORCE1.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/NIKEAIRFORCE.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/AIRFORCE1.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/NIKEAIRFORCE.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/AIRFORCE1.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/NIKEAIRFORCE.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/AIRFORCE1.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/NIKEAIRFORCE.PNG' },
    { id: 1, name: 'Awesome Product', price: 99.99, description: 'This is an awesome product!', imageUrl: 'http://localhost:3001/Media1/AIRFORCE1.PNG' },
];


app.get('/api/products', (req, res) => {
    res.json(products);
});




app.listen(3000);