export function parseTransactionType(type: string) {
  switch (type) {
    case "INCOME":
      return "Ingreso";
    case "EXPENSE":
      return "Gasto";
    default:
      return type;
  }
}
