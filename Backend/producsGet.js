const connectDB = require("./dbConnection");


async function getProducts (req, res)  {
        try {
            const db = await connectDB();
            const products = await db.collection('products').find({}).toArray();
            res.status(200).json(products);

        } catch (err) {
            console.error('Błąd:', err);
            res.status(500).json({error: 'Błąd podczas pobierania danych z MongoDB'});
        }

}



module.exports = getProducts;