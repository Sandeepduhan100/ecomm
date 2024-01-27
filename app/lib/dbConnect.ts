import mongoose from 'mongoose'

async function dbConnect() {
    try{
        await mongoose.connect("mongodb://localhost:27017/ECOMM")
    }
    catch(error){
        throw new Error("Connection faild")
    }
    
}
export default dbConnect