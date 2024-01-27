import dbConnect from '@/app/lib/dbConnect'
import OrderModel from '@/app/lib/models/OrderModel'
import { auth } from '@/app/lib/auth'

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  const { user } = req.auth
  await dbConnect()
  const orders = await OrderModel.find({ user: user._id })
  return Response.json(orders)
}) as any