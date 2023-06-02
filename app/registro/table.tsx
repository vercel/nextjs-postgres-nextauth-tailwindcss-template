import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { RegistryResponse } from 'models';
import { formatDate } from 'utils';

export default async function RegistryTable({ registry }: { registry: RegistryResponse[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Cultivo</TableHeaderCell>
          <TableHeaderCell>Fecha</TableHeaderCell>
          <TableHeaderCell>Producto</TableHeaderCell>
          <TableHeaderCell>Para</TableHeaderCell>
          <TableHeaderCell>Dosis</TableHeaderCell>
          <TableHeaderCell>Siguiente en</TableHeaderCell>
          <TableHeaderCell>Aclaraciones</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {registry.map((row) => (
          <TableRow key={row.id.toString()}>
            <TableCell>{row.crop}</TableCell>
            <TableCell>
            <Text>{formatDate(row.date)}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.name}</Text>
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
            <TableCell>
              <Text>{row.aclarations}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
