import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Crear usuario con contraseña hasheada
  const password = await bcrypt.hash("admin123", 10);

  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: password,
    },
  });

  // Crear transacciones asociadas al usuario
  await prisma.transaction.createMany({
    data: [
      {
        type: "INCOME",
        amount: 1000,
        category: "Salary",
        description: "Monthly income",
        userId: user.id,
      },
      {
        type: "EXPENSE",
        amount: 150,
        category: "Groceries",
        description: "Supermarket",
        userId: user.id,
      },
      {
        type: "EXPENSE",
        amount: 80,
        category: "Transport",
        description: "Gas",
        userId: user.id,
      },
    ],
  });

  console.log("Seed data created ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
