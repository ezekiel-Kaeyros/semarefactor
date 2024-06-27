'use client';

import React, { useMemo, useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

import { CalendarOutlined } from '@ant-design/icons';
//import { CalendarOutlined } from './CalendarOutlined';
import moment from 'moment';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from '@nextui-org/react';

import Image from 'next/image';
import { columns, users, statusOptions } from './utils/data';

import EditIcon from '../../../../../../../../public/icons/edit.svg';
import InformationIcon from '../../../../../../../../public/icons/information.svg';
import DeleteIcon from '../../../../../../../../public/icons/trash-animation.svg';



const statusColorMap: any = {
  completed: 'warning',
  paused: 'danger',
  pending: 'warning',
};
const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';
const INITIAL_VISIBLE_COLUMNS = ['name', 'numProduct', 'status', 'actions'];

export default function TableHistory() {
  const [filterValue, setFilterValue] = useState<string>('');
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));

  const [visibleColumns, setVisibleColumns] = useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<any>('all');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = useState<any>({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = useState<number>(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  // Filtering

  const filteredItems = React.useMemo<any>(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  
 
  
  

  const renderCell = React.useCallback(
    (user: any, columnKey: string | number) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case 'name':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize font-normal">{cellValue}</p>
              
            </div>
          );
         
         
          case 'numProduct':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize font-normal">{cellValue}</p>
            
            </div>
          );
        case 'status':
          return (
            <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center items-center gap-2">
              
          
              <Image src={InformationIcon} alt="Icon info" />
              <Image src={DeleteIcon} alt="Icon delete" />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

 

  

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


  return (
 
      <Table
      aria-label="Example table with custom cells, pagination and sorting"
     //  isStriped={true}	
      bottomContent={bottomContent} 
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "px-0 max-h-[382px] dark:bg-[#2B2E31] mt-12",
        th: ['dark:bg-transparent','text-white', 'font-normal', 'rounded-none', 'w-1/4 text-center'],
        td: [
          'py-3  border-t border-divider', 'dark:bg-[#2B2E31]',
          'w-1/4 text-center'
          
        ],
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "center"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id} data-middle={true} data-first>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
   
  );
}
