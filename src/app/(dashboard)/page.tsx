"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: "txn1",
    date: "2025-05-01",
    category: "Salary",
    type: "INCOME",
    amount: 1200,
  },
  {
    id: "txn2",
    date: "2025-05-03",
    category: "Groceries",
    type: "EXPENSE",
    amount: -150,
  },
  {
    id: "txn3",
    date: "2025-05-05",
    category: "Transport",
    type: "EXPENSE",
    amount: -80,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">$1200</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-red-600">$230</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$970</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>{txn.category}</TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell className="text-right">
                    {txn.amount < 0 ? (
                      <span className="text-red-600">
                        ${Math.abs(txn.amount)}
                      </span>
                    ) : (
                      <span className="text-green-600">${txn.amount}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
