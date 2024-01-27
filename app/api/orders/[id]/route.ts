import { auth } from "@/app/lib/auth";
import dbConnect from "@/app/lib/dbConnect";
import OrderModel from "@/app/lib/models/OrderModel";




export const GET = auth(async(...request: any)=>{
const [req,{params}] = request
if(!req.auth){
    return Response.json(
        {message: 'unauthorized'},
        {
            status:401,
        }
    )
}
await dbConnect()
const order= await OrderModel.findById(params.id)
return Response.json(order)

}) as any