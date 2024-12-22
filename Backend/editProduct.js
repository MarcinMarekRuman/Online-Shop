const connectDB = require("./dbConnection");
const {ObjectId} = require("mongodb");


async function editProduct(req, res, next) {
    const { id } = req.params;
    let { editName,  editDescription, editPrice, editImageURL } = req.body;

    if(!editName) {
        try{
            const db = await connectDB();
            const  noEdited = await db.collection('products').findOne({ _id: new ObjectId(id) });

            if(noEdited) {
                editName = noEdited.name;
                editDescription = noEdited.description;
                editPrice = noEdited.price;
                editImageURL = noEdited.imageURL;
            }
        }
        catch (err){
            next;
        }
    }

    if(!editDescription) {
        try{
            const db = await connectDB();
            const  noEdited = await db.collection('products').findOne({ _id: new ObjectId(id) });

            if(noEdited) {
                editDescription = noEdited.description;
            }
        }
        catch (err){
            next;
        }
    }
    if(!editPrice) {
        try{
            const db = await connectDB();
            const  noEdited = await db.collection('products').findOne({ _id: new ObjectId(id) });

            if(noEdited) {
                editPrice = noEdited.price;
            }
        }
        catch (err){
            next;
        }
    }

    if(!editImageURL) {
        try{
            const db = await connectDB();
            const  noEdited = await db.collection('products').findOne({ _id: new ObjectId(id) });

            if(noEdited) {
                editImageURL = noEdited.imageURL;
            }
        }
        catch (err){
            next;
        }
    }


    try {
        const db = await connectDB();

        const updateData = {};
        if (editName) updateData.name = editName;
        if (editDescription) updateData.description = editDescription;
        if (editPrice) updateData.price = editPrice;
        if (editImageURL) updateData.imageURL = editImageURL;


        const editedProduct = await db.collection('products').updateOne(
            { _id: new ObjectId(id) },
            { $set:updateData },
        );




        if (editedProduct.modifiedCount > 0) {
            res.status(200).json({message: 'Product has been updated' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
}


module.exports = editProduct;