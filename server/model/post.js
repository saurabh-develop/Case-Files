import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true  
    },
    createdDate: {
        type: Date
    },
    likes:{
        type: Number, default: 0 
    },
    views:{
         type: Number, default: 0 
    }

});


const post = mongoose.model('post', PostSchema);

export default post;