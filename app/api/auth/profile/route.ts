import { auth } from '@/app/lib/auth'
import dbConnect from '@/app/lib/dbConnect'
import UserModel from '@/app/lib/models/UserModel'
import bcrypt from 'bcryptjs'

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 })
  }
  const { user } = req.auth
  const { name, email, password } = await req.json()
  await dbConnect()
  try {
    const dbUser = await UserModel.findById(user._id)
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      )
    }
    dbUser.name = name
    dbUser.email = email
    dbUser.password = password
      ? await bcrypt.hash(password, 5)
      : dbUser.password
    await dbUser.save()
    return Response.json({ message: 'User has been updated' })
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any