// app/api/transactions/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const transaction = await prisma.transaction.findUnique({
    where: { id: params.id },
  });

  if (!transaction)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(transaction);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const updated = await prisma.transaction.update({
    where: { id: params.id },
    data: {
      type: body.type,
      amount: body.amount,
      category: body.category,
      description: body.description,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.transaction.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}
