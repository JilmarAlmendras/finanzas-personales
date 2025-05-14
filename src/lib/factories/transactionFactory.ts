import { TransactionType } from "@prisma/client";
import { prisma } from "../prisma";

/**
 * Crea una transacción asociada a un usuario.
 * @param userId El ID del usuario al que pertenece la transacción.
 * @param overrides Valores opcionales para sobrescribir campos por defecto.
 * @returns La transacción creada.
 */
export async function createTransaction(
  userId: string,
  overrides?: Partial<{
    type: TransactionType;
    amount: number;
    category: string;
    description?: string;
    date: Date;
  }>
) {
  const transaction = await prisma.transaction.create({
    data: {
      type: overrides?.type ?? TransactionType.EXPENSE,
      amount: overrides?.amount ?? Math.random() * 100,
      category: overrides?.category ?? "General",
      description: overrides?.description ?? "Descripción de prueba",
      date: overrides?.date ?? new Date(),
      userId,
    },
  });

  return transaction;
}
