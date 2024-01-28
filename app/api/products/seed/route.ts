import data from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/lib/models/UserModel";
import ProductModel from "@/app/lib/models/ProductModel";

const seedData = async () => {
  const { users, products } = data;

  try {
    await UserModel.deleteMany();
    await UserModel.insertMany(users);

    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);

    return {
      success: true,
      message: 'Seeded successfully',
      users,
      products,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in seeding data:', error);

   
  }
};

export const GET = async (request: NextRequest) => {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({
      message: 'Seeding is only allowed in the development environment',
    });
  }

  await dbConnect();
  const result = await seedData();

  return NextResponse.json(result);
};
