'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { initialStatistiques } from '../../components/bulk-messages/startCart/dataStat';
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
  // Chip,
  // User,
  Pagination,
} from '@nextui-org/react';
import * as XLSX from 'xlsx';

import Image from 'next/image';
import dayjs from 'dayjs';
import { SearchIcon } from './SearchIcon';
import { columns, users, statusOptions } from './utils/data';
import { capitalize } from './utils/utils';
// import Card from '../card/Card';
import { ChevronDownIcon } from './ChevronDownIcon';
import EditIcon from '../../../../../public/icons/edit.svg';
import InformationIcon from '../../../../../public/icons/information.svg';
import DeleteIcon from '../../../../../public/icons/trash-animation.svg';

import importIcon from '../../../../../public/import.png';
import exportIcon from '../../../../../public/export.png';
import IconCalendar from '../../../../../public/icons/calendar.svg';
import { CircularProgress } from '@nextui-org/react';
// import StatContent from '../../components/bulk-messages/startCart/StartCart';
// import { dateTimeNow } from '@/utils/constants';
// import Link from 'next/link';
// import { ButtonI } from '../button/Button';
import ModalDelete from './modal-delete/ModalDelete';
import ModaldetailBroadcast from '../../components/bulk-messages/bulk-message-content/saved-templates/filled-bulk-message/TableHistoryBulkMessage/modalDetail/ModalDetail';
import { ButtonI } from '../button/Button';
import ModaldetailBroadcastExport from '../../components/bulk-messages/bulk-message-content/saved-templates/filled-bulk-message/TableHistoryBulkMessage/modalDetail/ModalDetailExport';

// const statusColorMap: any = {
//   completed: 'success',
//   paused: 'danger',
//   pending: 'warning',
// };
// const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';
const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'time',
  'recipients',
  'successful',
  'read',
  'failed',

  'actions',
];

const App: React.FC<{ tableSession: any[] }> = ({ tableSession }) => {
  const [filterValue, setFilterValue] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [valueArray, setValueArray] = useState();
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));
  const [date, setDate] = useState<Date>(new Date());

  const [incrementalFiltering, setIncrementalFiltering] = useState(true);
  const [dateEnd, setDateEnd] = useState<any>();
  const [dateStart, setDateStart] = useState<any>();
  const [currentDateStart, setCurrentDateStart] = useState<any>();
  const [currentDateEnd, setCurrentDateEnd] = useState<any>();
  const [selectedtDateStart, setSelectedtDateStart] = useState<any>();
  const [identityData, setIdentityData] = useState<any>();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalExport, setIsShowModalExport] = useState(false);
  const [view, setView] = useState(false);
  const [exp, setExp] = useState(false);

  const [idSession, setIdSession] = useState('');
  const [dateSession, setDateSession] = useState('');
  
  const [visibleColumns, setVisibleColumns] = useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
   const [arrayImport, setArrayImport] = useState<
     {
       id: string;
       tab: any[];
      
     }[]
   >([]);
   const [statusFilter, setStatusFilter] = useState<any>('all');
   const [rowsPerPage, setRowsPerPage] = useState<number>(5);
   const [sortDescriptor, setSortDescriptor] = useState<any>({
     column: 'age',
     direction: 'ascending',
   });
   // ;

   const [page, setPage] = useState<number>(1);

   // const pages = Math.ceil(users.length / rowsPerPage);

   // Filtering
  //  console.log('reverse', tableSession.reverse());
  useEffect(() => {
  console.log('arrayImport',arrayImport);
  
},[arrayImport])
   const hasSearchFilter = Boolean(filterValue);

   const filteredItems = React.useMemo<any>(() => {
     let filteredUsers = [...tableSession];

     if (hasSearchFilter) {
       filteredUsers = filteredUsers.filter((user) =>
         user.template_name.toLowerCase().includes(filterValue.toLowerCase())
       );
     }
     // if (
     //   statusFilter !== 'all' &&
     //   Array.from(statusFilter).length !== statusOptions.length
     // ) {
     //   filteredUsers = filteredUsers.filter((user) =>
     //     Array.from(statusFilter).includes(user.status)
     //   );
     // }

     return filteredUsers;
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tableSession, filterValue, statusFilter]);

   const pages = Math.ceil(filteredItems.length / rowsPerPage);

   const headerColumns = useMemo(() => {
     return columns.filter((column) =>
       Array.from(visibleColumns).includes(column.uid)
     );
   }, [visibleColumns]);
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

   // On range picker change
   const onChangeDateStart: DatePickerProps['onChange'] = (
     date: any,
     dateString
   ) => {
     const currentDate = moment();
     const selectedDate = moment(date);

     setCurrentDateStart(currentDate);
     setSelectedtDateStart(selectedDate);
     setDateStart(date);
   };

   const onChangeDateEnd: DatePickerProps['onChange'] = (
     date: any,
     dateString
   ) => {
     const currentDate = moment(); // Current date
     const selectedDate = moment(date);
     setCurrentDateEnd(currentDate);
     setSelectedtDateStart(selectedDate);
     setDateEnd(date);
   };

   // HANDLE CSV EXPORT FUNCTIONALITY
   let objUrl = '/';
   if (tableSession.length > 0) {
     let final_value = [];
     if (incrementalFiltering === true) {
       final_value = tableSession;
     } else {
       final_value = tableSession;
     }

     const titleKeys = Object.keys(final_value[0]);
     // //

     const refinedData = [];
     refinedData.push(titleKeys);

     users.forEach((item) => {
       refinedData.push(Object.values(item));
       // //
     });

     let csvContent = '';

     refinedData.forEach((row) => {
       csvContent += row.join(',') + '\n';
       // //
     });

     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
     // //

     objUrl = URL.createObjectURL(blob);
     // //
   }
   const showHandler = () => {
     setIsShowModal((isShowModal) => !isShowModal);
     setIdSession('');
   };
  const renderCell = React.useCallback(
   
     (user: any, columnKey: string | number) => {
       const cellValue = user[columnKey];
   console.log('arrayImport123456',arrayImport)

     

       switch (columnKey) {
         case 'name':
           return (
             <div className="flex flex-row  items-center gap-3">
               <input
                 id={user.template_name}
                 type="checkbox"
                 className="h-4 w-4 cursor-pointer"
                 onClick={() => {
                  //  console.log('arrayImport',arrayImport);
                   
                if (arrayImport.length > 0) {
                  const value = arrayImport.filter(
                    (item) => item.id == user?.id
                  );
                  if (value.length > 0) {
                    const del = arrayImport.filter(
                      (item) => item.id != user?.id
                    );
                    setArrayImport([...del]);
                    console.log('del', del);
                  } else {
                    const add = arrayImport;
                    add.push({
                      id: user.id,
                      tab: user?.broadcasts ? user?.broadcasts : [],
                    });
                    setArrayImport([...add]);
                    console.log('add', add);
                  }
                } else {
                  const add = arrayImport;
                  add.push({
                    id: user.id,
                    tab: user?.broadcasts ? user?.broadcasts : [],
                  });
                  setArrayImport([...add]);
                  console.log('add')
                }
                   // console.log('value',value);
                 }}
               />
               <label
                 className="text-bold text-small capitalize font-normal cursor-pointer "
                 onClick={() => {
                   // ;
                   setValueArray(undefined);
                   setIdSession(user?.id);
                   setDateSession(
                     user.created_at.split('T')[0].split('-')[2] +
                       '-' +
                       user.created_at.split('T')[0].split('-')[1] +
                       '-' +
                       user.created_at.split('T')[0].split('-')[0] +
                       ' ' +
                       user.created_at.split('T')[1].split(':')[0] +
                       ':' +
                       user.created_at.split('T')[1].split(':')[1]
                   );
                   setIsShowModal((isShowModal) => !isShowModal);
                 }}
               >
                
                   {user.template_name}
                
               </label>
             </div>
           );

         case 'time':
           return (
             <div className="flex flex-col">
               <p className="text-bold text-small capitalize font-normal">
                 {user.created_at.split('T')[0].split('-')[2] +
                   '-' +
                   user.created_at.split('T')[0].split('-')[1] +
                   '-' +
                   user.created_at.split('T')[0].split('-')[0] +
                   ' ' +
                   user.created_at.split('T')[1].split(':')[0] +
                   ':' +
                   user.created_at.split('T')[1].split(':')[1]}
               </p>
             </div>
           );
         case 'recipients':
           return (
             <div className="flex flex-col">
               <p className="text-bold text-small capitalize font-normal">
                 {user?.broadcasts ? user?.broadcasts.length : 0}
               </p>
             </div>
           );
         case 'successful':
           return (
             <div className="flex flex-row ">
               <CircularProgress
                 size="lg"
                 classNames={{
                   indicator: 'text-[green]',
                   // value: 'text-[green]',
                 }}
                 value={
                   user?.broadcasts
                     ? user?.broadcasts.filter(
                         (item: any) =>
                           item.status == 'read' || item.status == 'delivered'
                       ).length
                     : 0
                 }
                 // color="success"
                 showValueLabel={true}
                 maxValue={user?.broadcasts && user?.broadcasts.length}
                 formatOptions={{ style: 'decimal' }}
               />
             </div>
           );
         case 'read':
           return (
             <div className="flex flex-row ">
               <CircularProgress
                 size="lg"
                 classNames={{
                   indicator: 'text-[green]',
                   // value: 'text-[green]',
                 }}
                 value={
                   user?.broadcasts
                     ? user?.broadcasts.filter(
                         (item: any) => item.status == 'read'
                       ).length
                     : 0
                 }
                 // color="success"
                 // formatOptions={{ style: "unit", unit: "kilometer" }}
                 showValueLabel={true}
                 maxValue={user?.broadcasts && user?.broadcasts.length}
                 formatOptions={{ style: 'decimal' }}
               />
             </div>
           );
         case 'failed':
           return (
             <div className="flex flex-row ">
               <CircularProgress
                 size="lg"
                 value={
                   user?.broadcasts
                     ? user?.broadcasts.filter(
                         (item: any) => item.status == 'failed'
                       ).length
                     : 0
                 }
                 color="success"
                 //  formatOptions={{ style: "unit", unit: "kilometer" }}
                 showValueLabel={true}
                 maxValue={user?.broadcasts && user?.broadcasts.length}
                 formatOptions={{ style: 'decimal' }}
               />
             </div>
           );

         case 'actions':
           return (
             <div className="relative flex  items-center gap-2">
               <Button
                 onClick={async () => {
                   if (user.broadcasts && user?.broadcasts.length > 0) {
                     try {
                       // setLoading(true);
                       // const response = await fetch('https://fakestoreapi.com/products');
                       // Check if the action result contains data and if it's an array
                       if (user.broadcasts && Array.isArray(user.broadcasts)) {
                         const newArray = user.broadcasts.map((item: any) => {
                           delete item.response_id;
                           delete item.created_at;
                           delete item.phone_number_id;
                           delete item.session_id;
                           delete item.template_id;
                           delete item.id;
                           return {
                             ...item,
                             date:
                               user.created_at.split('T')[0].split('-')[2] +
                               '-' +
                               user.created_at.split('T')[0].split('-')[1] +
                               '-' +
                               user.created_at.split('T')[0].split('-')[0] +
                               ' ' +
                               user.created_at.split('T')[1].split(':')[0] +
                               ':' +
                               user.created_at.split('T')[1].split(':')[1],
                           };
                         });
                         //   const dataToExport = products.map((pro: any) => ({
                         //     title: pro.title,
                         //     price: pro.lastname,
                         //     category: pro.category,
                         //     description: pro.description,
                         //   }));
                         // Create Excel workbook and worksheet
                         const workbook = XLSX.utils.book_new();
                         const worksheet = XLSX.utils?.json_to_sheet(newArray);
                         XLSX.utils.book_append_sheet(
                           workbook,
                           worksheet,
                           'ReportExport'
                         );
                         // Save the workbook as an Excel file
                         XLSX.writeFile(workbook, `Report.xlsx`);
                         console.log(`Exported data to Report.xlsx`);
                         // setLoading(false);
                       } else {
                         // setLoading(false);
                         // console.log('#==================Export Error');
                       }
                     } catch (error: any) {
                       // setLoading(false);
                       console.log(
                         '#==================Export Error',
                         error.message
                       );
                     }
                   }
                 }}
                 className="flex items-center px-1 justify-center text-sm bg-[green] text-white gap-3"
               >
                 <Image src={exportIcon} alt="" className="h-5 w-5" />
                 <span>Xlxs</span>
               </Button>

               <Button
                 className="flex items-center px-1 justify-center text-sm bg-[red] text-white gap-3"
                 onClick={() => {
                   if (user.broadcasts && user?.broadcasts.length > 0) {
                     // alert('ok')
                     setValueArray(user?.broadcasts);
                     setIsShowModal(true);
                     setDateSession(
                       user.created_at.split('T')[0].split('-')[2] +
                         '-' +
                         user.created_at.split('T')[0].split('-')[1] +
                         '-' +
                         user.created_at.split('T')[0].split('-')[0] +
                         ' ' +
                         user.created_at.split('T')[1].split(':')[0] +
                         ':' +
                         user.created_at.split('T')[1].split(':')[1]
                     );
                   }
                 }}
               >
                 <Image src={exportIcon} alt="" className="h-5 w-5" />
                 <span>pdf</span>
               </Button>
               {/* <Image src={EditIcon} alt="Icon edit" /> */}
               {/* <Image
                src={InformationIcon}
                alt="Icon info"
                onClick={() => {
                  // ;
                  setIdSession(user?.id);
                  setIsShowModal((isShowModal) => !isShowModal);
                }}
              /> */}
               {/* <Image src={DeleteIcon} alt="Icon delete" /> */}
               <ModalDelete />
             </div>
           );
         default:
           return cellValue;
       }
     },
     [arrayImport]
   );

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="flex flex-col w-full overflow-x-auto no-scrollbar pb-1 pt-14">
          Sorted By
          <div className="flex justify-between gap-3 items-end w-full">
            <div className="2xl:w-[55%] w-fit flex flex-row gap-3 h-10">
              <Dropdown>
                <DropdownTrigger className="flex min-w-[150px] focus:bg-[#2B2E31] dark:bg-[#2B2E31] sm:max-w-[30%] justify-between h-full ">
                  <Button
                    className="text-sm font-thin text-[#CFD4D8]"
                    endContent={
                      <ChevronDownIcon className="text-sm font-thin" />
                    }
                  >
                    latest...
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Input
                isClearable
                classNames={{
                  base: ' min-w-[250px] focus:bg-[#2B2E31] sm:max-w-[30%] text-sm h-full',
                  inputWrapper: 'border-0 py-0 bg-[#2B2E31] text-sm h-full',
                }}
                startContent={<SearchIcon />}
                placeholder="Search"
                size="sm"
                value={filterValue}
                variant="bordered"
                onClear={() => setFilterValue('')}
                onValueChange={onSearchChange}
              />
              <Space>
                <div className="h-full flex gap-1 min-w-[125px]">
                  <Image src={IconCalendar} alt="icon calendar" />
                  <span className="flex flex-col">
                    <span className="text-[14px] p-0 font-light text-[#CFD4D8]">
                      From date
                    </span>
                    <DatePicker
                      suffixIcon=""
                      className="text-white p-0 text-[14px] bg-transparent border-0 hover:text-white hover:bg-transparent hover:border-0"
                      defaultValue={dayjs(dateStart)}
                      onChange={onChangeDateStart}
                      format={dateFormat}
                    />
                  </span>
                </div>

                <div className="h-full flex gap-1 min-w-[125px]">
                  <Image src={IconCalendar} alt="icon calendar" />
                  <span className="flex flex-col">
                    <span className="text-[14px] p-0 font-light text-[#CFD4D8]">
                      To date
                    </span>
                    <DatePicker
                      suffixIcon=""
                      disabledDate={(current) => {
                        // Your logic to disable specific dates
                        return (
                          current && (current < dateStart || current > dateEnd)
                        );
                      }}
                      className="text-white p-0 text-[14px] bg-transparent border-0 hover:text-white hover:bg-transparent hover:border-0"
                      defaultValue={dayjs(dateEnd)}
                      onChange={onChangeDateEnd}
                      format={dateFormat}
                    />
                  </span>
                </div>
              </Space>
              {/* <div className="flex gap-3 "> */}
              <div className="pb-3 h-14 relative ">
                <ButtonI
                  disabled={arrayImport.length == 0 ? true : false}
                  variant={'bgDark'}
                  icon={exportIcon}
                  // rightIcon={ true }
                  leftIcon={true}
                  iconSize={20}
                  className={`${arrayImport.length == 0 ? 'opacity-40' : 'opacity-100'} border h-full w-full`}
                  // className='text-[12px] h-[50px]'
                  onClick={() => {
                    setView((view) => !view);
                    // setExp(true);
                  }}
                >
                  Export
                </ButtonI>
                <div
                  className={`absolute -top-[70px] w-full  border z-50 p-1 rounded-lg bg-white ${view ? 'block' : 'hidden'}`}
                >
                  <p
                    className="text-[red] cursor-pointer mb-2"
                    onClick={() => {
                      setIsShowModalExport((isShowDetail) => !isShowDetail);
                      setExp(true);
                      setView(false);
                    }}
                  >
                    pdf
                  </p>
                  <p
                    className="text-[green] cursor-pointer"
                    onClick={async () => {
                      if (arrayImport && arrayImport.length > 0) {
                        arrayImport.map((item) => {
                          try {
                            // setLoading(true);
                            // const response = await fetch('https://fakestoreapi.com/products');
                            // Check if the action result contains data and if it's an array
                            if (
                              item.tab &&
                              Array.isArray(item.tab)
                            ) {
                              const newArray = item.tab.map(
                                (item: any) => {
                                  const date1 = item.created_at.toString();
                                  delete item.response_id;
                                  delete item.created_at;
                                  delete item.phone_number_id;
                                  delete item.session_id;
                                  delete item.template_id;
                                  delete item.id;
                                  return {
                                    ...item,
                                    date:
                                      date1
                                        .split('T')[0]
                                        .split('-')[2] +
                                      '-' +
                                      date1
                                        .split('T')[0]
                                        .split('-')[1] +
                                      '-' +
                                      date1
                                        .split('T')[0]
                                        .split('-')[0] +
                                      ' ' +
                                      date1
                                        .split('T')[1]
                                        .split(':')[0] +
                                      ':' +
                                      date1
                                        .split('T')[1]
                                        .split(':')[1],
                                  };
                                }
                              );
                              //   const dataToExport = products.map((pro: any) => ({
                              //     title: pro.title,
                              //     price: pro.lastname,
                              //     category: pro.category,
                              //     description: pro.description,
                              //   }));
                              // Create Excel workbook and worksheet
                              const workbook = XLSX.utils.book_new();
                              const worksheet =
                                XLSX.utils?.json_to_sheet(newArray);
                              XLSX.utils.book_append_sheet(
                                workbook,
                                worksheet,
                                'ReportExport'
                              );
                              // Save the workbook as an Excel file
                              XLSX.writeFile(
                                workbook,
                                `Report_` +
                                  item.tab[0].created_at
                                    .split('T')[0]
                                    .split('_')[2] +
                                  '-' +
                                  item.tab[0].created_at
                                    .split('T')[0]
                                    .split('_')[1] +
                                  '-' +
                                  item.tab[0].created_at
                                    .split('T')[0]
                                    .split('_')[0] +
                                  ' ' +
                                  item.tab[0].created_at
                                    .split('T')[1]
                                    .split('_')[0] +
                                  ':' +
                                  item.tab[0].created_at
                                    .split('T')[1]
                                    .split('_')[1] +
                                  '.xlsx'
                              );
                              console.log(`Exported data to Report.xlsx`);
                              // setLoading(false);
                            } else {
                              // setLoading(false);
                              // console.log('#==================Export Error');
                            }
                          } catch (error: any) {
                            // setLoading(false);
                            console.log(
                              '#==================Export Error',
                              error.message
                            );
                          }
                        })
                      }
                    }}
                  >
                    xlsx
                  </p>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-4 w-full overflow-auto no-scrollbar">
          <StatContent initialStatistiques={initialStatistiques} />
        </div> */}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
    arrayImport.length,
    view
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          // isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        {/* <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${items.length} selected`}
        </span> */}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  // ;
  // ;
  // ;
  // Fonction de filtrage des données en fonction de l'intervalle de temps
  const filtrerIntervalleTemps = () => {
    if (dateStart && dateEnd) {
      // let tableauDonnees = users.map((items)=> {items.time})
      const tableauFiltre = users.filter((item) => {
        return item.time >= dateStart && item.time <= dateEnd;
      });
      // Utilisez le nouveau tableau filtré comme vous le souhaitez
      // ;
    }
  };
  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper:
            'px-0 max-h-[382px] dark:bg-[#2B2E31] mt-5 w-full overflow-y-auto no-scrollbar',
          th: ['dark:bg-transparent', 'text-white', 'font-normal'],
          td: [
            'px-3  border-t border-divider text-default-700',
            // 'dark:bg-[#2B2E31]',
            ,
          ],
          // tr:'hover:bg-white'
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'center'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No users found'} items={sortedItems}>
          {(item) => (
            <TableRow
              key={item.id}
              className="hover:bg-[#3f3e3e]  hover:text-black"
              onClick={() => {
                // ;
              }}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isShowModal && (
        <ModaldetailBroadcast
          isShow={isShowModal}
          showHandler={showHandler}
          id={idSession}
          date={dateSession}
          datas={valueArray ? valueArray : []}
        />
      )}
      {isShowModalExport && (
        <ModaldetailBroadcastExport
          isShow={isShowModalExport}
          showHandler={()=>setIsShowModalExport(false)}
          id={idSession}
          date={dateSession}
          datas={arrayImport}
        />
      )}
    </>
  );
};

export default App;
