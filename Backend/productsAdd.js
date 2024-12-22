const connectDB = require("./dbConnection");


async function addProduct(req , res){
    const { name,  description,price, imageURL } = req.body;
    try{
        const db = await connectDB();
        let product = await db.collection(
            'products').insertOne(
                {name: name,
                      description: description,
                      price: price,
                      imageURL: imageURL,
                    createdAt: new Date()
                });


        res.status(201).json({message: 'Product added to cart', product: product });
    }catch(err){
        res.status(500).json({ error: 'Error while product adding' });
    }

}


module.exports = addProduct;