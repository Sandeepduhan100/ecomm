import data from "@/app/lib/data";
import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect"
import UserModel from "@/app/lib/models/UserModel";
import ProductModel from "@/app/lib/models/ProductModel";

export const GET = async (request: NextRequest)=>{
    const {users,products}= data
    await dbConnect()
    await UserModel.deleteMany()
    await UserModel.insertMany(users)
    await ProductModel.deleteMany()
    await ProductModel.insertMany(products)
    return NextResponse.json({
        message: 'seeded sucessfully',
        users,
        products,
    })
}