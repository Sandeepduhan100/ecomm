import { auth } from '@/app/lib/auth'
import dbConnect from '@/app/lib/dbConnect'
import UserModel from '@/app/lib/models/UserModel'
import bcrypt from 'bcryptjs'

export const PUT = auth(async (req) => {
  try {
    if (!req.auth) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Not authenticated' }),
      };
    }

    const { user } = req.auth;
    const { name, email, password } = await req.json();

    // Validate input data
    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Name and email are required' }),
      };
    }

    await dbConnect();
    const dbUser = await UserModel.findById(user._id);

    if (!dbUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password ? await bcrypt.hash(password, 5) : dbUser.password;

    await dbUser.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User has been updated' }),
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in PUT request:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
}) as any;
