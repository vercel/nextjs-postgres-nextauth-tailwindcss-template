import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

interface Product {
  id: number;
  compound?: string;
  name: string;
  type?: string;
  group?: string,
  for?: string;
  dose?: string;
  when?: string;
  crop?: string;
  ps?: string;
}

export default async function ProductsTable({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Compuesto</TableHeaderCell>
          <TableHeaderCell>Tipo</TableHeaderCell>
          <TableHeaderCell>Grupo</TableHeaderCell>
          <TableHeaderCell>Tratamiento para</TableHeaderCell>
          <TableHeaderCell>Dosis</TableHeaderCell>
          <TableHeaderCell>Cuándo</TableHeaderCell>
          <TableHeaderCell>Cultivo</TableHeaderCell>
          <TableHeaderCell>PS</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              <Text>{product.compound}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.type}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.group}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.for}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.dose}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.when}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.crop}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.ps}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
