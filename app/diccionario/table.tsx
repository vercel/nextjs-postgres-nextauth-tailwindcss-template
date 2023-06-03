import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { Dictionary } from 'models';

export default async function DictionaryTable({
  dictionary
}: {
  dictionary: Dictionary[];
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Palabra</TableHeaderCell>
          <TableHeaderCell>Definición</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dictionary.map((row) => (
          <TableRow key={row.id.toString()}>
            <TableCell>{row.palabra}</TableCell>
            <TableCell>
              <Text>{row.definicion}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
