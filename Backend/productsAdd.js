const connectDB = require("./dbConnection");


async function addProduct(name, description, price, imageURL){
    try{
        const db = await connectDB();
        let products = await db.collection(
            'products').insertOne(
                {name: name,
                      description: description,
                      price: price,
                      imageURL: imageURL,
                    createdAt: new Date()
                });


    }catch(err){
        console.log(err);
        throw err;
    }

}


module.exports = addProduct;