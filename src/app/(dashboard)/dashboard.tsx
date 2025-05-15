"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Income } from "@/components/icons/income";
import { Expenses } from "@/components/icons/expenses";
import { parseTransactionType } from "@/utils/parseTransactionType";
import { Pencil, Trash2 } from "lucide-react";

type Transaction = {
  id: string;
  date: string;
  category: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string;
};

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const resetForm = () => {
    setAmount("");
    setType("EXPENSE");
    setCategory("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const payload = {
      amount: parseFloat(amount),
      type,
      category,
      description,
    };

    const url = editingId
      ? `/api/transactions/${editingId}`
      : "/api/transactions";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchTransactions();
      resetForm();
      setIsDialogOpen(false);
    }
  };

  const handleEditClick = (txn: Transaction) => {
    setEditingId(txn.id);
    setAmount(txn.amount.toString());
    setType(txn.type);
    setCategory(txn.category);
    setDescription(txn.description || "");
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      await fetchTransactions();
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tablero de control</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" onClick={() => resetForm()}>
              + Nueva Transacción
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Editar Transacción" : "Crear Transacción"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Select
                value={type}
                onValueChange={(val) => setType(val as "INCOME" | "EXPENSE")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INCOME">Ingreso</SelectItem>
                  <SelectItem value="EXPENSE">Gasto</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Monto"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Input
                placeholder="Categoría"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Textarea
                placeholder="Descripción (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button onClick={handleSubmit} className="w-full">
                {editingId ? "Guardar Cambios" : "Guardar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex justify-between pr-[20px]">
            <div className="w-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Ingresos totales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-green-600">
                  Bs. {totalIncome.toFixed(2)}
                </p>
              </CardContent>
            </div>

            <Income />
          </div>
        </Card>

        <Card>
          <div className="flex justify-between pr-[20px]">
            <div className="w-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Gastos totales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-red-600">
                  Bs. {totalExpenses.toFixed(2)}
                </p>
              </CardContent>
            </div>

            <Expenses />
          </div>
        </Card>

        <Card>
          <div className="flex justify-between pr-[20px]">
            <div className="w-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Balance neto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  Bs. {netBalance.toFixed(2)}
                </p>
              </CardContent>
            </div>

            {netBalance >= 0 ? <Income /> : <Expenses />}
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Importe</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>
                      {new Date(txn.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{txn.category}</TableCell>
                    <TableCell>{parseTransactionType(txn.type)}</TableCell>
                    <TableCell className="text-right">
                      {txn.type === "EXPENSE" ? (
                        <span className="text-red-600">
                          -Bs. {txn.amount.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-green-600">
                          +Bs. {txn.amount.toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(txn)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(txn.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
