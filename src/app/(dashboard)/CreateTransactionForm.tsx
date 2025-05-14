"use client";

import { useState } from "react";
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

interface CreateTransactionFormProps {
  onCreated: () => void;
}

export function CreateTransactionForm({
  onCreated,
}: CreateTransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          type,
          category,
          description,
        }),
      });

      if (res.ok) {
        // Limpiar el formulario
        setAmount("");
        setType("EXPENSE");
        setCategory("");
        setDescription("");
        onCreated();
      } else {
        console.error("Error creating transaction");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <Button onClick={handleSubmit} className="w-full" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </div>
  );
}
