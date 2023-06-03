import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { Product } from 'models';

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
          <TableRow key={product.id.toString()}>
            <TableCell>{product.nombre}</TableCell>
            <TableCell>
              <Text>{product.compuestos}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.tipo}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.grupo}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.para}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.dosis}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.cuando}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.cultivo}</Text>
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
