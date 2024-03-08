import mongoose from "mongoose";


export const Connection = async(username,password) => {
    const URL=`mongodb+srv://${username}:${password}@blog-app.l2nf7lo.mongodb.net/`;
    try {
        await mongoose.connect(URL,{useNewUrlParser : true});
        console.log('Database connected successfully');
    }catch(error){
        console.log('Error while connecting with the database',error);

    }
}

export default Connection;