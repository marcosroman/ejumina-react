const mongoose = require('mongoose');

mongoose.set('strictQuery','false');

mongoose.connect('mongodb://127.0.0.1/ejuminadb')
        .then(() => console.log("connected to db"))
        .catch(err => console.log("couldn't connect: ", err));

