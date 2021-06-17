const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Karim:Rx226iWNj@mycluster.hrafv.mongodb.net/dbgame',
    {useNewUrlParser:true, useCreateIndex:true,
    useUnifiedTopology:true, useFindAndModify:false}, (err) => {
        if(err)
        console.log('Connection failed' + err);
        else
        console.log('Connected');
    }
);
module.exports = mongoose;