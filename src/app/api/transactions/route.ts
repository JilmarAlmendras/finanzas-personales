// app/api/transactions/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const body = await request.json();

  const transaction = await prisma.transaction.create({
    data: {
      type: body.type,
      amount: body.amount,
      category: body.category,
      description: body.description,
      userId: body.userId,
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}
