import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { Registry } from '../../models';

export default async function RegistryTable({ registry }: { registry: Registry[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Cultivo</TableHeaderCell>
          <TableHeaderCell>Producto</TableHeaderCell>
          <TableHeaderCell>Para</TableHeaderCell>
          <TableHeaderCell>Dosis</TableHeaderCell>
          <TableHeaderCell>Tratamiento para</TableHeaderCell>
          <TableHeaderCell>Dosis</TableHeaderCell>
          <TableHeaderCell>Siguiente tratamiento en</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {registry.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.crop}</TableCell>
            <TableCell>
              <Text>{row.product?.name}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.for}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.dose}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.next}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
