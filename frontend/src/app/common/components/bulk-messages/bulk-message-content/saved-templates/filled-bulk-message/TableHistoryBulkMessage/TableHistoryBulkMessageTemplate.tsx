'use client';
import importIcon from '../../../../../../../../../public/images/arrow-down (1).svg';
import exportIcon from '../../../../../../../../../public/export.png';

import InformationIcon from '../../../../../../../../../public/icons/information.svg';

import Image from 'next/image';
import * as XLSX from 'xlsx';

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Pagination,
  CircularProgress,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import TransactionConfirm from '@/app/common/components/transactionSending/transaction-confirm/TransactionConfirm';

import React from 'react';

import Link from 'next/link';
// import { Button } from '@/app/common/components/button/Button';

import { ButtonI } from '@/app/common/ui/button/Button';
import { ChevronDownIcon } from '@/app/common/ui/table/ChevronDownIcon';
import { capitalize } from '@/app/common/ui/table/utils/utils';
import { SearchIcon } from '@/app/common/ui/table/SearchIcon';

import ModaldetailBroadcast from './modalDetail/ModalDetail';
import ModalDelete from '@/app/common/ui/table/modal-delete/ModalDelete';
import ModaldetailBroadcastExport from './modalDetail/ModalDetailExport';

// const columns = ['Template Name', 'date', 'action'];
const column = [''];
type SessionTemplate = {
  id: string;
  template_name: string;
  template_id: string;
  company_name: string;
  phone_number_id: string;
  created_at: string;
};

const TableHistoryTemplete: React.FC<{
  multibleTable?: any;
  tableSession?: any;
  delete?: any;
}> = (props) => {
  const [isShowModalExport, setIsShowModalExport] = useState(false);
  const [all, setAll] = useState('');
  const [noCheck, SetnoCheck] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isDisplay, setIsDisplay] = useState('');

  const [idSession, setIdSession] = useState('');
  const [valueArray, setValueArray] = useState();
  const [dateSession, setDateSession] = useState('');
  const [view, setView] = useState(false);
  const [exp, setExp] = useState(false);
  const [pageTable, setPageTable] = useState<number>(8);
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);
  const editorRef = useRef<null | HTMLDivElement>(null);

  const [arrayImport, setArrayImport] = useState<
    {
      id: string;
      tab: any[];
      name: string;
      date: string;
    }[]
  >([]);
  const text =
    ' All templates must adhere to WhatsApp’s Template Message Guidelines. Click here to read';
  const filteredItems = useMemo(() => {
    let filterTableTemple: any[];

    filterTableTemple = props.tableSession;

    if (hasSearchFilter && filterTableTemple?.length > 0) {
      filterTableTemple = filterTableTemple.filter((item: SessionTemplate) =>
        item
          ?.template_name!.toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase())
      );
    }

    return filterTableTemple;
  }, [filterValue, hasSearchFilter, props.tableSession]);

  const [page, setPage] = useState(1);
  const [isChange, setIsChange] = useState(false);

  const pages = Math.ceil(filteredItems.length / pageTable);

  const items = useMemo(() => {
    const start1 = (page - 1) * pageTable;
    const end1 = start1 + pageTable;

    return filteredItems.slice(start1, end1);
  }, [page, filteredItems, pageTable]);

  // function of sort table
  const [sortDescriptor, setSortDescriptor] = useState<any>({
    column: 'number',
    direction: 'ascending',
  });

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a;
      const second = b;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // function of get value of input search
  const onSearchChange = useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);
  const showHandler = () => {
    setIsShowModal((isShowModal) => !isShowModal);
    setIdSession('');
  };

  const numberTotal = (type: string, tab: any[], name: string) => {
    if (type == 'total') {
      let num = 0;
      const arrayfilter = tab.map((item: any) => {
        num = item.broadcasts ? num + item.broadcasts.length : num + 0;
        return num;
      });

      const initialValue = 0;
      const sumWithInitial = arrayfilter.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      return arrayfilter[arrayfilter.length - 1];
    }

    if (type == 'failed') {
      let num = 0;

      const arrayfilter = tab.map((item: any) => {
        item.broadcasts &&
          item.broadcasts.map((row: any) => {
            if (row.status == 'failed') {
              num = num + 1;

              return num;
            }
          });
      });
      // console.log('arrayfilter', arrayfilter);
      return num;
    }

    if (type == 'success') {
      let num = 0;

      const arrayfilter = tab.map((item: any) => {
        item.broadcasts &&
          item.broadcasts.map((row: any) => {
            if (row.status == 'read' || row.status == 'delivered') {
              num = num + 1;

              return num;
            }
          });
      });
      // console.log('arrayfilter', arrayfilter);
      return num;
    }

    if (type == 'read') {
      let num = 0;

      const arrayfilter = tab.map((item: any) => {
        item.broadcasts &&
          item.broadcasts.map((row: any) => {
            if (row.status == 'read') {
              //  console.log('row', row);

              num = num + 1;
              //  console.log('read', num);

              return num;
            }
          });
      });

      return num;
    }
  };

  const onGetExporProduct = async (
    title?: string,
    worksheetname?: string,
    arrayProps?: any[],
    time?: string
  ) => {
    try {
      // setLoading(true);
      // const response = await fetch('https://fakestoreapi.com/products');
      // Check if the action result contains data and if it's an array
      console.log('array', arrayProps);

      if (arrayProps && Array.isArray(arrayProps) && arrayProps.length > 0) {
        const newArray = arrayProps.map((item) => {
          const date1 = item.created_at ? item.created_at.toString() : '';

          delete item.response_id;
          delete item.created_at;
          delete item.phone_number_id;
          delete item.session_id;
          delete item.template_id;
          delete item.id;
          return {
            ...item,
            date: time?
              time.split('T')[0].split('-')[2] +
              '-' +
              time.split('T')[0].split('-')[1] +
              '-' +
              time.split('T')[0].split('-')[0] +
              ' ' +
              time.split('T')[1].split(':')[0] +
              ':' +
              time.split('T')[1].split(':')[1] : '',
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
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        const date1 = arrayProps[0].created_at
          ? arrayProps[0].created_at.toString()
          : '';

        XLSX.writeFile(
          workbook,
          `${title}_${
            time
              ? time.split('T')[0].split('-')[2] +
                '-' +
                time.split('T')[0].split('-')[1] +
                '-' +
                time.split('T')[0].split('-')[0] +
                ' ' +
                time.split('T')[1].split(':')[0] +
                ':' +
                time.split('T')[1].split(':')[1]
              : ''
          }.xlsx`
        );
        console.log(`Exported data to ${title}.xlsx`);
        // setLoading(false);
      } else {
        // setLoading(false);
        // console.log('#==================Export Error');
      }
    } catch (error: any) {
      // setLoading(false);
      console.log('#==================Export Error', error.message);
    }
  };
   useEffect(() => {
     if (isChange) {
       if (editorRef.current) {
         editorRef.current.scrollIntoView();
       }
     }
     // getFileHandler('../../../../../../public');
   }, [isChange, page]);
  return (
    <div>
      {props.tableSession.length > 0 ? (
        <>
          <div className="w-full">
            Sorted By
            <div className="flex w-full gap-5 ">
              <div className="flex gap-5">
                <Input
                  isClearable
                  classNames={{
                    base: 'w-auto focus:bg-[#2B2E31]  text-sm h-full',
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
              </div>
              <div className="pb-3 h-14 relative ">
                <ButtonI
                  disabled={arrayImport.length == 0 && all == '' ? true : false}
                  variant={'bgDark'}
                  icon={exportIcon}
                  // rightIcon={ true }
                  leftIcon={true}
                  iconSize={20}
                  className={`${arrayImport.length == 0 && all == '' ? 'opacity-40' : 'opacity-100'} border h-full w-full`}
                  // className='text-[12px] h-[50px]'
                  onClick={() => {
                    setView((view) => !view);
                    // setExp(true);
                  }}
                >
                  {/* Export */}
                  {arrayImport.length}
                </ButtonI>
                <div
                  className={`absolute -top-[70px] w-full  border z-50 p-1 rounded-lg bg-white ${view && arrayImport.length > 0 ? 'block' : 'hidden'}`}
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
                    onClick={() => {
                      if (arrayImport && arrayImport.length > 0) {
                        arrayImport.map(async (item) => {
                          const response = await onGetExporProduct(
                            item.name,
                            'rapport',
                            item.tab,
                            item.date
                          );
                          // console.log('item',item);
                        });
                      }
                    }}
                  >
                    xlsx
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="text-[#F18805] px-2 py-2 rounded-lg my-6 bg-white w-fit">
              {text}
            </div> */}
            {/* tables of details of rows actions */}
            <div className="mt-6">
              <div className="  ">
                <Table
                  aria-label="rows table"
                  bottomContent={
                    <div className="md:flex block md:m-0 m-auto w-auto md:w-full justify-between">
                      {/* <div className="flex text-black md:mb-0 mb-3 ">
                        <label className="mr-2 mt-2 font-[VisbyCF-light]">
                          show :{' '}
                        </label>
                        <select
                          name=""
                          id=""
                          onChange={(e: any) => {
                            setPageTable(e.target.value);
                          }}
                          className="rounded-xl font-[VisbyCF-light] pr-0 text-sm border"
                        >
                          <option key={pageTable}>{pageTable}</option>
                       
                        </select>
                      </div> */}

                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => {
                          setPage(page);
                          setIsChange(true);
                        }}
                        className="sm:w-auto "
                        classNames={{
                          cursor: 'bg-[red]',
                        }}
                      />
                    </div>
                  }
                  bottomContentPlacement="outside"
                  sortDescriptor={sortDescriptor}
                  onSortChange={setSortDescriptor}
                  classNames={{
                    wrapper: ' bg-[#2B2E31] px-0 py-0 font-[serif] ',
                    thead: 'bg-[#2B2E31] text-red-800 rounded-none ',
                  }}
                >
                  <TableHeader
                    columns={column}
                    className="bg-transparent   text-red-800 hidden"
                  >
                    {column.map((row, index) => {
                      return (
                        <TableColumn
                          className="text-left h-14 bg-[#2B2E31] text-[#CFD4D8] font-semibold"
                          key={index}
                        >
                          {row}
                        </TableColumn>
                      );
                    })}
                  </TableHeader>
                  <TableBody items={sortedItems}>
                    {sortedItems.map((row, index) => {
                      return (
                        <TableRow
                          key={index}
                          className="border-t-1  h-14 border-white py-2 "
                        >
                          <TableCell className=" w-full px-0">
                            <>
                              <div
                                className={`flex px-2 justify-between w-full text-lg ${row.id == isDisplay && 'mb-10 bg-[#585858]'}`}
                              >
                                <div className="flex flex-row  items-center gap-3 flex-grow w-96 ">
                                  <input
                                    id={row.created_at}
                                    type="checkbox"
                                    className="h-5 w-5 cursor-pointer"
                                    checked={all == row.template_name}
                                    onClick={() => {
                                      if (
                                        all == '' ||
                                        all != row.template_name
                                      ) {
                                        const array: any[] = [];
                                        setAll(row.template_name);
                                        SetnoCheck(0);
                                        const arrayCheck =
                                          props.multibleTable.map(
                                            (item: any) => {
                                              if (
                                                item.template_name ==
                                                row.template_name
                                              ) {
                                                array.push({
                                                  id: item.id,
                                                  tab: item.broadcasts
                                                    ? item.broadcasts
                                                    : [],
                                                  name: item.template_name,
                                                  date: item.created_at,
                                                });
                                              }
                                            }
                                          );
                                        console.log('array', array);

                                        setArrayImport([...array]);
                                      } else {
                                        setAll('');
                                        setArrayImport([]);
                                        setView(false);
                                      }
                                      // console.log('value',value);
                                    }}
                                  />
                                  <label
                                    className="text-bold text-small capitalize font-normal cursor-pointer "
                                    onClick={() => {}}
                                  >
                                    {row.template_name}
                                  </label>
                                </div>
                                <div className="flex items-center flex-grow w-[160px] ">
                                  dates
                                </div>

                                <div className="flex items-center flex-grow px-5 ">
                                  <p className="text-bold text-small capitalize font-normal">
                                    {
                                      // let val:number=0
                                      numberTotal(
                                        'total',
                                        props.multibleTable.filter(
                                          (item: any) =>
                                            item.template_name ==
                                            row.template_name
                                        ),
                                        row.template_name
                                      ) + ''
                                    }
                                  </p>
                                </div>
                                <div className="flex items-center flex-grow px-5 ">
                                  <CircularProgress
                                    size="lg"
                                    label="Total success"
                                    classNames={{
                                      indicator: 'text-[green]',
                                      // value: 'text-[green]',
                                    }}
                                    value={numberTotal(
                                      'success',
                                      props.multibleTable.filter(
                                        (item: any) =>
                                          item.template_name ==
                                          row.template_name
                                      ),
                                      row.template_name
                                    )}
                                    // color="success"
                                    showValueLabel={true}
                                    maxValue={numberTotal(
                                      'total',
                                      props.multibleTable.filter(
                                        (item: any) =>
                                          item.template_name ==
                                          row.template_name
                                      ),
                                      row.template_name
                                    )}
                                    formatOptions={{
                                      style: 'decimal',
                                    }}
                                  />
                                </div>
                                <div className="flex items-center flex-grow px-5 ">
                                  <CircularProgress
                                    size="lg"
                                    label="Total read"
                                    classNames={{
                                      indicator: 'text-[blue]',
                                      // value: 'text-[green]',
                                    }}
                                    value={numberTotal(
                                      'read',
                                      props.multibleTable.filter(
                                        (item: any) =>
                                          item.template_name ==
                                          row.template_name
                                      ),
                                      row.template_name
                                    )}
                                    // color="success"
                                    showValueLabel={true}
                                    maxValue={numberTotal(
                                      'total',
                                      props.multibleTable.filter(
                                        (item: any) =>
                                          item.template_name ==
                                          row.template_name
                                      ),
                                      row.template_name
                                    )}
                                    formatOptions={{
                                      style: 'decimal',
                                    }}
                                  />
                                </div>
                                <div className="flex items-center flex-grow px-5 ">
                                  <CircularProgress
                                    size="lg"
                                    label="Total failed"
                                    classNames={{
                                      indicator: 'text-[orange]',
                                      // value: 'text-[green]',
                                    }}
                                    value={numberTotal(
                                      'failed',
                                      props.multibleTable.filter(
                                        (item: any) =>
                                          item.template_name ==
                                          row.template_name
                                      ),
                                      row.template_name
                                    )}
                                    // color="success"
                                    showValueLabel={true}
                                    maxValue={numberTotal(
                                      'total',
                                      props.multibleTable.filter(
                                        (item: any) =>
                                          item.template_name ==
                                          row.template_name
                                      ),
                                      row.template_name
                                    )}
                                    formatOptions={{
                                      style: 'decimal',
                                    }}
                                  />
                                </div>

                                <div className="relative flex  items-center gap-2 flex-grow pl-5 justify-end pr-4  w-[218px]">
                                  <Image
                                    src={importIcon}
                                    alt=""
                                    className={`h-6 w-6  ${isDisplay == row.id && 'rotate-180'} cursor-pointer`}
                                    onClick={() => {
                                      if (isDisplay == row.id) {
                                        setIsDisplay('');
                                      } else {
                                        setIsDisplay(row.id);
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="w-full max-h-96 overflow-y-auto ">
                                {isDisplay == row.id &&
                                  props.multibleTable
                                    .reverse()
                                    .map((item: any, index: number) => {
                                      if (
                                        item.template_name == row.template_name
                                      ) {
                                        return (
                                          <div
                                            className="flex justify-between w-full py-2 px-2"
                                            key={index}
                                          >
                                            <div className="flex flex-row  items-center gap-3 flex-grow w-96 ">
                                              <input
                                                id={row.template_name}
                                                checked={
                                                  arrayImport.filter(
                                                    (items1) =>
                                                      items1.id == item?.id
                                                  ).length > 0
                                                    ? true
                                                    : false
                                                }
                                                type="checkbox"
                                                className="h-5 w-5  cursor-pointer"
                                                onClick={() => {
                                                  SetnoCheck(0);
                                                  console.log(
                                                    'arrayImport',
                                                    arrayImport
                                                  );
                                                  if (arrayImport.length > 0) {
                                                    const value =
                                                      arrayImport.filter(
                                                        (items1) =>
                                                          items1.id == item?.id
                                                      );
                                                    if (value.length > 0) {
                                                      const del =
                                                        arrayImport.filter(
                                                          (items1) =>
                                                            items1.id !=
                                                            item?.id
                                                        );
                                                      setArrayImport([...del]);
                                                      console.log('del', del);
                                                    } else {
                                                      const add = arrayImport;
                                                      add.push({
                                                        id: item.id,
                                                        tab: item?.broadcasts
                                                          ? item?.broadcasts
                                                          : [],
                                                        name: item.template_name,
                                                        date: item.created_at,
                                                      });
                                                      setArrayImport([...add]);
                                                      console.log('add', add);
                                                    }
                                                  } else {
                                                    const add = arrayImport;
                                                    add.push({
                                                      id: item.id,
                                                      tab: item?.broadcasts
                                                        ? item?.broadcasts
                                                        : [],
                                                      name: item.template_name,
                                                      date: item.created_at,
                                                    });
                                                    setArrayImport([...add]);
                                                    console.log('add');
                                                  }
                                                  // console.log('value',value);
                                                }}
                                              />
                                              <label
                                                className="text-bold text-small capitalize font-normal cursor-pointer "
                                                onClick={() => {
                                                  setValueArray(undefined);
                                                  setIdSession(item?.id);
                                                  setDateSession(
                                                    item.created_at
                                                      .split('T')[0]
                                                      .split('-')[2] +
                                                      '-' +
                                                      item.created_at
                                                        .split('T')[0]
                                                        .split('-')[1] +
                                                      '-' +
                                                      item.created_at
                                                        .split('T')[0]
                                                        .split('-')[0] +
                                                      ' ' +
                                                      item.created_at
                                                        .split('T')[1]
                                                        .split(':')[0] +
                                                      ':' +
                                                      item.created_at
                                                        .split('T')[1]
                                                        .split(':')[1]
                                                  );
                                                  setIsShowModal(
                                                    (isShowModal) =>
                                                      !isShowModal
                                                  );
                                                }}
                                              >
                                                {row.template_name}
                                              </label>
                                            </div>

                                            <div className="flex items-center flex-grow w-[160px] ">
                                              <p className="text-bold text-small capitalize font-normal">
                                                {item.created_at
                                                  .split('T')[0]
                                                  .split('-')[2] +
                                                  '-' +
                                                  item.created_at
                                                    .split('T')[0]
                                                    .split('-')[1] +
                                                  '-' +
                                                  item.created_at
                                                    .split('T')[0]
                                                    .split('-')[0] +
                                                  ' ' +
                                                  item.created_at
                                                    .split('T')[1]
                                                    .split(':')[0] +
                                                  ':' +
                                                  item.created_at
                                                    .split('T')[1]
                                                    .split(':')[1]}
                                              </p>
                                            </div>

                                            <div className="flex items-center flex-grow px-5 ">
                                              <p className="text-bold text-small capitalize font-normal">
                                                {item?.broadcasts
                                                  ? item?.broadcasts.length
                                                  : 0}{' '}
                                                {'sent'}
                                              </p>
                                            </div>

                                            <div className="flex items-center flex-grow px-5 ">
                                              <CircularProgress
                                                size="lg"
                                                label="Success"
                                                classNames={{
                                                  indicator: 'text-[green]',
                                                  // value: 'text-[green]',
                                                }}
                                                value={
                                                  item?.broadcasts
                                                    ? item?.broadcasts.filter(
                                                        (items: any) =>
                                                          items.status ==
                                                            'read' ||
                                                          items.status ==
                                                            'delivered'
                                                      ).length
                                                    : 0
                                                }
                                                // color="success"
                                                showValueLabel={true}
                                                maxValue={
                                                  item?.broadcasts &&
                                                  item?.broadcasts.length
                                                }
                                                formatOptions={{
                                                  style: 'decimal',
                                                }}
                                              />
                                            </div>

                                            <div className="flex items-center flex-grow px-5 ">
                                              <CircularProgress
                                                size="lg"
                                                label="Read"
                                                classNames={{
                                                  indicator: 'text-[blue]',
                                                  // value: 'text-[green]',
                                                }}
                                                value={
                                                  item?.broadcasts
                                                    ? item?.broadcasts.filter(
                                                        (items: any) =>
                                                          items.status == 'read'
                                                      ).length
                                                    : 0
                                                }
                                                // color="success"
                                                // formatOptions={{ style: "unit", unit: "kilometer" }}
                                                showValueLabel={true}
                                                maxValue={
                                                  item?.broadcasts &&
                                                  item?.broadcasts.length
                                                }
                                                formatOptions={{
                                                  style: 'decimal',
                                                }}
                                              />
                                            </div>

                                            <div className="flex items-center flex-grow px-5 ">
                                              <CircularProgress
                                                size="lg"
                                                label="Failed"
                                                value={
                                                  item?.broadcasts
                                                    ? item?.broadcasts.filter(
                                                        (items: any) =>
                                                          items.status ==
                                                          'failed'
                                                      ).length
                                                    : 0
                                                }
                                                classNames={{
                                                  indicator: 'text-[orange]',
                                                  // value: 'text-[green]',
                                                }}
                                                //  formatOptions={{ style: "unit", unit: "kilometer" }}
                                                showValueLabel={true}
                                                maxValue={
                                                  item?.broadcasts &&
                                                  item?.broadcasts.length
                                                }
                                                formatOptions={{
                                                  style: 'decimal',
                                                }}
                                              />
                                            </div>

                                            <div className="relative flex  items-center gap-2 flex-grow pl-5 ">
                                              <Button
                                                onClick={async () => {
                                                  if (
                                                    item.broadcasts &&
                                                    item?.broadcasts.length > 0
                                                  ) {
                                                    try {
                                                      // setLoading(true);
                                                      // const response = await fetch('https://fakestoreapi.com/products');
                                                      // Check if the action result contains data and if it's an array
                                                      if (
                                                        item.broadcasts &&
                                                        Array.isArray(
                                                          item.broadcasts
                                                        )
                                                      ) {
                                                        const newArray =
                                                          item.broadcasts.map(
                                                            (items: any) => {
                                                              delete items.response_id;
                                                              delete items.created_at;
                                                              delete items.phone_number_id;
                                                              delete items.session_id;
                                                              delete items.template_id;
                                                              delete items.id;
                                                              return {
                                                                ...items,
                                                                date:
                                                                  item.created_at
                                                                    .split(
                                                                      'T'
                                                                    )[0]
                                                                    .split(
                                                                      '-'
                                                                    )[2] +
                                                                  '-' +
                                                                  item.created_at
                                                                    .split(
                                                                      'T'
                                                                    )[0]
                                                                    .split(
                                                                      '-'
                                                                    )[1] +
                                                                  '-' +
                                                                  item.created_at
                                                                    .split(
                                                                      'T'
                                                                    )[0]
                                                                    .split(
                                                                      '-'
                                                                    )[0] +
                                                                  ' ' +
                                                                  item.created_at
                                                                    .split(
                                                                      'T'
                                                                    )[1]
                                                                    .split(
                                                                      ':'
                                                                    )[0] +
                                                                  ':' +
                                                                  item.created_at
                                                                    .split(
                                                                      'T'
                                                                    )[1]
                                                                    .split(
                                                                      ':'
                                                                    )[1],
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
                                                        const workbook =
                                                          XLSX.utils.book_new();
                                                        const worksheet =
                                                          XLSX.utils?.json_to_sheet(
                                                            newArray
                                                          );
                                                        XLSX.utils.book_append_sheet(
                                                          workbook,
                                                          worksheet,
                                                          'ReportExport'
                                                        );
                                                        // Save the workbook as an Excel file
                                                        XLSX.writeFile(
                                                          workbook,
                                                          `Report.xlsx`
                                                        );
                                                        console.log(
                                                          `Exported data to Report.xlsx`
                                                        );
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
                                                <Image
                                                  src={exportIcon}
                                                  alt=""
                                                  className="h-5 w-5"
                                                />
                                                <span>Xlxs</span>
                                              </Button>

                                              <Button
                                                className="flex items-center px-1 justify-center text-sm bg-[red] text-white gap-3"
                                                onClick={() => {
                                                  if (
                                                    item.broadcasts &&
                                                    item?.broadcasts.length > 0
                                                  ) {
                                                    // alert('ok')
                                                    setValueArray(
                                                      item?.broadcasts
                                                    );
                                                    setIsShowModal(true);
                                                    setDateSession(
                                                      item.created_at
                                                        .split('T')[0]
                                                        .split('-')[2] +
                                                        '-' +
                                                        item.created_at
                                                          .split('T')[0]
                                                          .split('-')[1] +
                                                        '-' +
                                                        item.created_at
                                                          .split('T')[0]
                                                          .split('-')[0] +
                                                        ' ' +
                                                        item.created_at
                                                          .split('T')[1]
                                                          .split(':')[0] +
                                                        ':' +
                                                        item.created_at
                                                          .split('T')[1]
                                                          .split(':')[1]
                                                    );
                                                  }
                                                }}
                                              >
                                                <Image
                                                  src={exportIcon}
                                                  alt=""
                                                  className="h-5 w-5"
                                                />
                                                <span>pdf</span>
                                              </Button>
                                              {/* <Image src={EditIcon} alt="Icon edit" /> */}
                                              {/* <Image
                src={InformationIcon}
                alt="Icon info"
                onClick={() => {
                  // ;
                  setIdSession(row?.id);
                  setIsShowModal((isShowModal) => !isShowModal);
                }}
              /> */}
                                              {/* <Image src={DeleteIcon} alt="Icon delete" /> */}
                                              <ModalDelete />
                                            </div>
                                          </div>
                                        );
                                      }
                                    })}
                              </div>
                            </>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
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
          showHandler={() => setIsShowModalExport(false)}
          id={idSession}
          date={dateSession}
          datas={arrayImport}
        />
      )}
      <div ref={editorRef}></div>
    </div>
  );
};
export default TableHistoryTemplete;
