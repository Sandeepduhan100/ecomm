import mongoose from 'mongoose'

async function dbConnect() {
    try{
        await mongoose.connect("mongodb+srv://sandeepduhan1432:sandeepduhan1432@cluster0.xdjbkvl.mongodb.net/ECOMM")
    }
    catch(error){
        throw new Error("Connection faild")
    }
    
}
export default dbConnect