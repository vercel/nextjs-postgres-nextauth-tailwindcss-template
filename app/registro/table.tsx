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
            <TableCell>{row.cultivo}</TableCell>
            <TableCell>
            <Text>{formatDate(row.fecha)}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.nombre}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.para}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.dosis}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.siguiente}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.aclaraciones}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
