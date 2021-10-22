const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    authorId:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    body:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default: 0
    },
    comments:{
        type:Array
    }

});

const Posts = mongoose.model('Post', postSchema);
module.exports = Posts;