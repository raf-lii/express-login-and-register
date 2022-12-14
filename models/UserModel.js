require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    // useCreateIndex: true
});

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    }
});

const connected = mongoose.model("User", schema);

exports.connected = connected