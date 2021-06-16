const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/dbgame',
    {useNewUrlParser:true, useCreateIndex:true,
    useUnifiedTopology:true, useFindAndModify:false}, (err) => {
        if(err)
        console.log('Connection failed' + err);
        else
        console.log('Connected');
    }
);
module.exports = mongoose;