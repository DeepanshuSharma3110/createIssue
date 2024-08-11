import mongoose from "mongoose";

const databaseConnect = async()=>{
    const url = process.env.MONDODB_URI;
    await mongoose.connect(url);
    console.log('data base is connected');
    
};

databaseConnect();
export default databaseConnect;