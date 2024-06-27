'use client';
import importIcon from '../../../../../../../../public/import.png';
import exportIcon from '../../../../../../../../public/export.png';
import EditIcon from '../../../../../../../../public/icons/edit.svg';
import InformationIcon from '../../../../../../../../public/icons/information.svg';
import DeleteIcon from '../../../../../../../../public/icons/trash-animation.svg';
import Image from 'next/image';

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
  Modal,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import TransactionConfirm from '@/app/common/components/transactionSending/transaction-confirm/TransactionConfirm';

import React from 'react';

import Link from 'next/link';
// import { Button } from '@/app/common/components/button/Button';
import { toast, Toaster } from 'react-hot-toast';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { TypeItemTableSaveTemplete } from '@/redux/features/types';
import { ButtonI } from '@/app/common/ui/button/Button';
import { ChevronDownIcon } from '@/app/common/ui/table/ChevronDownIcon';
import { capitalize } from '@/app/common/ui/table/utils/utils';
import { SearchIcon } from '@/app/common/ui/table/SearchIcon';

import { deleteTemplete } from './actionDeleteTemplete';
import ViewTemplateModal from './modal/ViewTemplateModal';
import EditTemplateModal from './modal/EditTemplateModal';
import { prop } from '@typegoose/typegoose';

const columns = ['Template Name', 'Status', 'Language', 'actions'];

const TableSaveTemplete: React.FC<{ data?: any; delete?: any }> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const [arrayImport, setArrayImport] = useState<
    {
      img: string;
      body: string;
      footer: string;
      id: string;
      name: string;
      url: string;
    }[]
  >([]);
  const [exp, setExp] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [nameTemplateState, setNameTemplateState] = useState('');
  const [info, setInfo] = useState('');
  const { TableTemplete } = useBolkMessage();
  const [detail, setdetail] = useState({
    img: '',
    body: '',
    footer: '',
    id: '',
    name: '',
    url: '',
  });
  const [pageTable, setPageTable] = useState<number>(8);
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);
  // ;
   const editorRef = useRef<null | HTMLDivElement>(null);

  const text =
    ' All templates must adhere to WhatsApp’s Template Message Guidelines. Click here to read';
  const filteredItems = useMemo(() => {
    let filterTableTemple: TypeItemTableSaveTemplete[];

    filterTableTemple = props.data;

    if (hasSearchFilter && filterTableTemple?.length > 0) {
      filterTableTemple = filterTableTemple.filter(
        (item: TypeItemTableSaveTemplete) =>
          item
            ?.name!.toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase()) ||
          item
            ?.status!.toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase())
      );
    }

    return filterTableTemple;
  }, [filterValue, hasSearchFilter, props.data]);

  const [page, setPage] = useState(1);
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
      // setIsChange(true)
    } else {
      setFilterValue('');
    }
  }, []);

  // const sendDatasHandler = () => {
  //   // ;
  //   try {
  //     const transfert = new TransfetService().sendFile(dataSending);
  //     if (transfert?.status === 200) {
  //       const result: Result = transfert.datas;
  //     }
  //   } catch (error) {
  //     // ;
  //   }

  //   setShowModalTransfer((showModalTransfer) => !showModalTransfer);
  // };
  

   // ;

  
   useEffect(() => {
     console.log('sortedItems', sortedItems);
     console.log('filterItems', filteredItems);
     console.log('data', props.data);
     console.log('arrayImport', arrayImport);
     console.log('items', items);
   }, [arrayImport]);
  
  
  
   useEffect(() => {
   if (isChange) {
      if (editorRef.current) {
        editorRef.current.scrollIntoView();
      }
   }
     // getFileHandler('../../../../../../public');
   }, [isChange,page]);
  return (
    <div>
      {props.data.length > 0 ? (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-full">
            Sorted By
            <div className="flex w-full  gap-5 ">
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
              <div className="flex gap-3 ">
                <div className="">
                  <ButtonI
                    disabled={arrayImport.length == 0 ? true : false}
                    variant={'bgDark'}
                    icon={exportIcon}
                    // rightIcon={ true }
                    leftIcon={true}
                    iconSize={20}
                    className={`${arrayImport.length == 0 ? 'opacity-40' : 'opacity-100'} border`}
                    // className='text-[12px] h-[50px]'
                    onClick={() => {
                      setIsShowDetail((isShowDetail) => !isShowDetail);
                      setExp(true);
                    }}
                  >
                    {/* Export */}
                    {arrayImport.length}
                  </ButtonI>
                </div>
              </div>
            </div>
            <div className="text-[#F18805] px-2 py-2 rounded-lg my-6 bg-white w-fit">
              {text}
            </div>
            {/* tables of details of users actions */}
            <div className="mt-6">
              <div className="  ">
                <Table
                  aria-label="Users table"
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
                          {selectOption.map((items) => {
                            if (items !== pageTable) {
                              return <option key={items}>{items}</option>;
                            }
                          })}
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
                    wrapper: ' bg-[#2B2E31] px-0 py-0 font-[serif]',
                    thead: 'bg-[#2B2E31] text-red-800 rounded-none xl:text-xl',
                    tbody: 'w-full',
                  }}
                  className=""
                >
                  <TableHeader
                    columns={columns}
                    className="bg-transparent   text-red-800 hidden"
                  >
                    {columns.map((row, index) => {
                      return (
                        <TableColumn
                          className="text-left h-14 bg-[#2B2E31] text-[#CFD4D8] font-semibold xl:text-xl "
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
                          className="border-t-1  h-14 border-white py-2 xl:text-lg w-full"
                        >
                          <TableCell className="text-left py-4 flex items-center gap-2">
                            <input
                              checked={
                                arrayImport.filter(
                                  (item) => item.name == row.name
                                ).length > 0
                                  ? true
                                  : false
                              }
                              id={row.name}
                              type="checkbox"
                              className="xl:h-5 xl:w-5 h-4 w-4 cursor-pointer"
                              onClick={() => {
                                const value = arrayImport.filter(
                                  (item) => item.name == row.name
                                );
                                if (value.length > 0) {
                                  const del = arrayImport.filter(
                                    (item) => item.name != row.name
                                  );
                                  setArrayImport([...del]);
                                  console.log('del', del);
                                } else {
                                  const add = arrayImport;
                                  add.push({
                                    img: row.image_url,
                                    body: row.body_text,
                                    footer: row.footer_text,
                                    id: row.template_id,
                                    name: row.name,
                                    url: row.image_url,
                                  });
                                  setArrayImport([...add]);
                                  console.log('add', add);
                                }
                                // console.log('value',value);
                              }}
                            />
                            <label
                              htmlFor={row.name}
                              className=" cursor-pointer xl:text-lg"
                            >
                              {' '}
                              {row.name}
                            </label>
                          </TableCell>

                          <TableCell className="text-left py-4 xl:w-96 lg:w-48">
                            <span
                              className={` py-2 rounded-full xl:text-base md:text-sm text-xs font-bold   bg-white ${
                                row.status === 'APPROVED' &&
                                'bg-respon text-[#04773B] px-3 py-3'
                              }
                        ${
                          row.status.toLocaleLowerCase() === 'pending' &&
                          'bg-notificationYellow text-[#D1AC00] px-3 py-3'
                        }
                        ${
                          row.status === 'REJECTED' &&
                          'bg-red-200 text-[#DA0303] px-3 py-3'
                        }
                        `}
                            >
                              {row.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-left py-4 xl:text-lg xl:w-96 lg:w-48">
                            {row?.language}
                          </TableCell>
                          <TableCell className="relative flex  items-center xl:gap-5 gap-2 ">
                            <Image
                              src={EditIcon}
                              alt="Icon edit"
                              className={`${row.status != 'PENDING' && 'cursor-pointer'} `}
                              onClick={() => {
                                if (row.status != 'PENDING') {
                                  setdetail({
                                    img: row.image_url,
                                    body: row.body_text,
                                    footer: row.footer_text,
                                    id: row.template_id,
                                    name: row.name,
                                    url: row.image_url,
                                  });
                                  setIsEdit((isEdit) => !isEdit);
                                }
                              }}
                            />
                            <Image
                              className="cursor-pointer"
                              src={InformationIcon}
                              alt="Icon info"
                              onClick={() => {
                                setArrayImport([]);

                                setdetail({
                                  img: row.image_url,
                                  body: row.body_text,
                                  footer: row.footer_text,
                                  id: row.template_id,
                                  name: row.name,
                                  url: row.image_url,
                                });
                                setIsShowDetail(
                                  (isShowDetail) => !isShowDetail
                                );
                              }}
                            />
                            {/* <Button
                              onMouseEnter={() => {
                                alert('ok');
                              }}
                              // onMouseLeave={() => {
                              //   alert('ok');
                              // }}
                              className="flex items-center -px-3 justify-center text-sm bg-[red] text-white"
                              onClick={async () => {
                                setdetail({
                                  img: row.image_url,
                                  body: row.body_text,
                                  footer: row.footer_text,
                                  id: row.template_id,
                                  name: row.name,
                                  url: row.image_url,
                                });
                                setIsShowDetail(
                                  (isShowDetail) => !isShowDetail
                                );
                                setExp(true);
                                setArrayImport([]);
                              }}
                            > */}
                            <Image
                              src={exportIcon}
                              alt=""
                              className="h-8 w-8  bg-[red] border-[red] rounded-lg p-1 sm:hidden block"
                              onMouseEnter={() => {
                                setInfo(row.name);
                              }}
                              onMouseLeave={() => {
                                setInfo('');
                              }}
                              onClick={async () => {
                                setdetail({
                                  img: row.image_url,
                                  body: row.body_text,
                                  footer: row.footer_text,
                                  id: row.template_id,
                                  name: row.name,
                                  url: row.image_url,
                                });
                                setIsShowDetail(
                                  (isShowDetail) => !isShowDetail
                                );
                                setExp(true);
                                setArrayImport([]);
                              }}
                            />
                            <span
                              className="h-8 w-8  cursor-pointer relative  items-center justify-center bg-[red] border-[red] rounded-lg sm:flex hidden"
                              onMouseEnter={() => {
                                setInfo(row.name);
                              }}
                              onMouseLeave={() => {
                                setInfo('');
                              }}
                              onClick={async () => {
                                setdetail({
                                  img: row.image_url,
                                  body: row.body_text,
                                  footer: row.footer_text,
                                  id: row.template_id,
                                  name: row.name,
                                  url: row.image_url,
                                });
                                setIsShowDetail(
                                  (isShowDetail) => !isShowDetail
                                );
                                setExp(true);
                                setArrayImport([]);
                              }}
                            >
                              <Image
                                src={exportIcon}
                                alt=""
                                width={20}
                                height={20}
                                // className="h-5 w-5  "
                              />
                              <div
                                className={`absolute h-8 w-8 z-[100] top-5 -right-8 p-1 bg-white text-black flex items-center justify-center text-sm rounded-lg ${info == row.name ? 'block' : 'hidden'}`}
                              >
                                pdf
                              </div>
                            </span>
                            {/* </Button> */}
                            <Image
                              src={DeleteIcon}
                              className="cursor-pointer"
                              alt="Icon delete"
                              onClick={async () => {
                                setExp(false);
                                if (
                                  row.name?.toLocaleLowerCase() !==
                                  'hello_world'
                                ) {
                                  setNameTemplateState(row.name);
                                  setIsShow((isShow) => !isShow);
                                }
                              }}
                            />{' '}
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

      {isShowDetail && (
        <ViewTemplateModal
          img={detail.img}
          footer={detail.footer}
          body={detail.body}
          isShow={isShowDetail}
          showHandler={() => {
            setIsShowDetail(false);
            setExp(false);
          }}
          exports={exp}
          data={arrayImport}
        />
      )}
      <EditTemplateModal
        img={detail.img}
        footer={detail.footer}
        body={detail.body}
        id={detail.id}
        isShow={isEdit}
        showHandler={() => {
          setIsEdit((isEdit) => !isEdit);
        }}
        name={detail.name}
        refresh={props.delete}
        url={detail.url}
      />

      <Modal
        isOpen={isShow}
        onOpenChange={() => {
          setIsShow((isShow) => !isShow);
        }}
        className=" bg-white sm:px-4 px-0 sm:z-10 z-[5000]"
        radius="lg"
        placement="center"
        closeButton={false}
        classNames={{
          // body: "py-6",
          // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          // header: "border-b-[1px] border-[#292f46]",
          // footer: "border-t-[1px] border-[#292f46]",
          closeButton: 'hidden',
        }}
      >
        <ModalContent>
          <>
            <ModalBody className="text-black pb-0 mb-0">
              <div className="w-full h-full bg-white flex items-center py-10">
                {!isConfirm ? (
                  <div>
                    <p className="text-sm">
                      are you sure you want to delete the templete{' '}
                      <strong> {nameTemplateState}</strong> ?
                    </p>
                    <div className="flex mt-10 justify-end">
                      <div className="mr-2">
                        <Button
                          className="w-auto bg-transparent border border-red-600 text-red-500"
                          onClick={() => {
                            setIsShow((isShow) => !isShow);
                          }}
                        >
                          cancel
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="w-auto bg-black text-white"
                          onClick={async () => {
                            setIsConfirm((isConfirm) => !isConfirm);
                            try {
                              const responseDelete =
                                await deleteTemplete(nameTemplateState);

                              // ;

                              props.delete();
                              setIsShow((isShow) => !isShow);
                              setNameTemplateState('');
                              setIsConfirm((isConfirm) => !isConfirm);
                              setTimeout(() => {
                                toast.success('template deleted');
                              }, 1000);
                            } catch (error) {
                              toast.error('delete fail');
                            }
                          }}
                        >
                          delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p>deleting.......</p>
                  </>
                )}
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
      <div ref={editorRef}></div>
    </div>
  );
};
export default TableSaveTemplete;
