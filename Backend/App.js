const express = require('express')
const path = require('path');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());


app.get('/api/message', (req, res) =>{
    res.json({message: 'Hello from Express!'});
});







app.listen(3000);