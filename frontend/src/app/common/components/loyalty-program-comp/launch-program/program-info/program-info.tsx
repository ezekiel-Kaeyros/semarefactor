'use client';
// import importIcon from '../../../../../../../../public/import.png';
import importIcon from '../../../../../../../public/import.png';
import exportIcon from '../../../../../../../public/export.png';
import EditIcon from '../../../../../../../public/icons/edit.svg';
import InformationIcon from '../../../../../../../public/icons/information.svg';
import DeleteIcon from '../../../../../../../public/icons/trash-animation.svg';
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
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';

import React from 'react';

import Link from 'next/link';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { TypeItemTableSaveTemplete } from '@/redux/features/types';
import { ButtonI } from '@/app/common/ui/button/Button';
import { ChevronDownIcon } from '@/app/common/ui/table/ChevronDownIcon';
import { capitalize } from '@/app/common/ui/table/utils/utils';
import { SearchIcon } from '@/app/common/ui/table/SearchIcon';
import { useQuery } from '@tanstack/react-query';
import { ModalInfo } from './ModalInfo';
import CustomModal from '@/app/common/ui/modal/Modal';

const columns = ['Program Name', 'No of Products', 'action'];

const ProgramInfo: React.FC<{ lang?: any }> = ({ lang }) => {
  const fetchData = async () => {
    return await fetch(
      `https://6r10kf27nk.execute-api.eu-central-1.amazonaws.com/prod/program/100609346426084`
    )
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };
  const { data, isError } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  // ;
  const { TableTemplete } = useBolkMessage();

  const [pageTable, setPageTable] = useState<number>(8);
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);
  const [selectedQrCode, setSelectedQrCode] = useState<any>();
  const [toggleModal, setToggleModal] = useState(false);

  const text =
    ' All templates must adhere to WhatsApp’s Template Message Guidelines. Click here to read';
  const filteredItems = useMemo(() => {
    let filterTableTemple: any[];

    filterTableTemple = data?.data;

    // if (hasSearchFilter && filterTableTemple?.length > 0) {
    //   filterTableTemple = filterTableTemple.filter(
    //     (item: any) =>
    //       item.name
    //         .toLocaleLowerCase()
    //         .includes(filterValue.toLocaleLowerCase()) ||
    //       item.nametemplete
    //         .toLocaleLowerCase()
    //         .includes(filterValue.toLocaleLowerCase())
    //   );
    // }

    return filterTableTemple;
  }, [filterValue, hasSearchFilter, data]);

  const [page, setPage] = useState(1);
  const pages = Math.ceil(filteredItems?.length / pageTable);

  const items = useMemo(() => {
    const start1 = (page - 1) * pageTable;
    const end1 = start1 + pageTable;

    return filteredItems?.slice(start1, end1);
  }, [page, filteredItems, pageTable]);

  // function of sort table
  const [sortDescriptor, setSortDescriptor] = useState<any>({
    column: 'number',
    direction: 'ascending',
  });

  const sortedItems = useMemo(() => {
    // return [...items].sort((a, b) => {
    //   const first = a;
    //   const second = b;
    //   const cmp = first < second ? -1 : first > second ? 1 : 0;
    //   return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    // });
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

  const selectedData = (id: string | number) => {
    const selectedItem = data.find(
      // (item: any) => item.id.toString() === id.toString()
      (item: any) => item.id.toString() === id.toString()
    );
    setSelectedQrCode(selectedItem);
  };

  const handleOpenModal = (id: string) => {
    const selectedItem = data.find(
      (item: any) => item.id.toString() === id.toString()
    );
    // ;
    selectedItem && setSelectedQrCode(selectedItem);
    setToggleModal(true);
  };

  const handleOpen = (openFunction: () => void) => {
    // Do something with the openFunction if needed
    // ;
    openFunction();
  };

  // ;

  return (
    <div>
      <div className="w-[70%] m-auto">
        {selectedQrCode && (
          <CustomModal
            isOpen={toggleModal}
            onClose={() => setToggleModal(false)}
            classStyle="m-auto"
          >
            <div className="flex justify-center">
              <Image
                src={selectedQrCode.qrcode.qr_image_url}
                alt="qr code"
                width={200}
                height={200}
              />
            </div>
          </CustomModal>
        )}
        <div className="w-full">
          <div className="mt-6">
            <div className="  ">
              {data ? (
                <Table
                  aria-label="Users table"
                  bottomContent={
                    <div className="md:flex block md:m-0 m-auto w-auto md:w-full justify-between">
                      <div className="flex text-black md:mb-0 mb-3 ">
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
                      </div>

                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                        className="sm:w-auto "
                      />
                    </div>
                  }
                  bottomContentPlacement="outside"
                  sortDescriptor={sortDescriptor}
                  onSortChange={setSortDescriptor}
                  classNames={{
                    wrapper: ' bg-[#2B2E31] px-0 py-0 ',
                    thead: 'bg-[#2B2E31] text-red-800 rounded-none ',
                  }}
                >
                  <TableHeader
                    columns={columns}
                    className="bg-transparent   text-red-800 hidden"
                  >
                    {columns.map((row, index) => {
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
                  <TableBody items={data}>
                    {data &&
                      data.map((row: any, index: number) => {
                        return (
                          <TableRow
                            key={index}
                            className="border-t-1  h-14 border-white py-2"
                          >
                            <TableCell className="font-[700] text-left py-4">
                              {row.name}
                            </TableCell>

                            <TableCell className="font-[700] text-left py-4">
                              {row.products.length}
                            </TableCell>

                            <TableCell className="relative flex  items-center gap-2">
                              {' '}
                              <Image
                                src={EditIcon}
                                alt="Icon edit"
                                className="cursor-pointer"
                              />
                              <Image
                                src={InformationIcon}
                                alt="Icon info"
                                onClick={() => handleOpenModal(row.id)}
                                className="cursor-pointer"
                              />
                              <Image src={DeleteIcon} alt="Icon delete" />{' '}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              ) : (
                <div className="">
                  <div className="flex flex-col justify-center items-center h-[400px] gap-y-10">
                    <div>
                      <h1 className="text-3xl text-[gray]">Loaing Data...</h1>
                    </div>
                    <div className="animate-spin rounded-full border-t-4 border-blue-700 h-16 w-16"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProgramInfo;
