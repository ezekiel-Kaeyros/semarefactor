import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function ProgramTable() {
  return (
    <Table fullWidth aria-label="Example static collection table"
    classNames={{
      wrapper: "px-0 max-h-[382px] dark:bg-[#2B2E31] mt-12 table-auto w-full",
      th: ['dark:bg-transparent','text-white', 'font-normal', 'rounded-none', 'w-1/3 text-center'],
      td: [
        'dark:bg-[#2B2E31]', 'py-3  border-t border-divider',
        'w-1/3 text-center'
     
        
      ],
    }}>
      <TableHeader>
        <TableColumn>Username</TableColumn>
        <TableColumn>Telephone</TableColumn>
        <TableColumn>Accumulated points</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1" >
          <TableCell>John Doe</TableCell>
          <TableCell>693532845</TableCell>
          <TableCell>10 points</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>John Doe</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
        <TableCell>John Doe</TableCell>
          <TableCell>693532845</TableCell>
          <TableCell>10 points</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
