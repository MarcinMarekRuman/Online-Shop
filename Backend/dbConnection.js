
 const{MongoClient} = require("mongodb");


let dbConnection;

async function connectDB(){
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url);
    const dbName = 'ShopDB';

    if(dbConnection){
        return dbConnection;
    }

    try{
         await client.connect();
        console.log('DB Connected')

        dbConnection = client.db(dbName);
        return dbConnection;

    }
    catch (err){
        console.error(err);
        throw err;
    }


}


module.exports = connectDB;