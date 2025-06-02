import { Card, CardFooter, CardHeader } from "@/components/ui/card";

function Prueba() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Prueba</h2>
        <p className="text-gray-600">This is a test page.</p>
      </CardHeader>
      <CardFooter>
        <p className="text-gray-500">Footer content goes here.</p>
      </CardFooter>
    </Card>
  );
}
export default Prueba;
