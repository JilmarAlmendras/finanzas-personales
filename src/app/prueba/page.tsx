import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { DeleteIcon, Edit2Icon } from "lucide-react";

function Prueba() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Prueba rama 2</h2>
        <p className="text-gray-600">This is a test page number 2.</p>
      </CardHeader>
      <CardFooter>
        <p className="text-gray-500">Footer content goes here again.</p>
        <DeleteIcon />
        <Edit2Icon />
      </CardFooter>
    </Card>
  );
}
export default Prueba;
