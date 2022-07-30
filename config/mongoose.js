require('dotenv').config()
const mongoose = require('mongoose');

main().catch((err) => {
    return console.log('Error', err);
});

main().then(() => {
    return console.log("Successfully connected with the database");
});

async function main(){
    await mongoose.connect('mongodb+srv://Admin-Atif:'+process.env.DATABASE_PASS+'@cluster0.lymyd.mongodb.net/?retryWrites=true&w=majority');
}