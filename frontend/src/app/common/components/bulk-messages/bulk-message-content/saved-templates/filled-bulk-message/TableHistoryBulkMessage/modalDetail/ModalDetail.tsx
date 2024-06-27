import { Button } from '@/app/common/ui/button/Button';
import usePdf from '@/app/hooks/usePdf';
import {BulkMessagesService} from '@/services';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,

  //   Button,
  Pagination,
  Modal,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
type DetailBroadcastTable = {
  error?: string;
  id?: number;
  session_id?: number;
  phone?: string;
  template_id?: number;
  response_id?: string;
  status?: string;
  template_name?: string;
  message_status?: string;
  phone_number_id?: string;
  success?: boolean;
  created_at?: Date;
};
import * as XLSX from 'xlsx';

const columns = ['phone', 'status', 'reason'];
const columns2 = ['phone', 'status', 'reason', 'date'];
const ModaldetailBroadcast: React.FC<{
  isShow: boolean;
  showHandler: any;
  id: string;
  date: string
  datas:any[]
}> = (props) => {
  const [dataBradcast, setDataBroadcast] = useState<DetailBroadcastTable[]>(props.datas);
  const refDiv = useRef<any>(null);
const imprimer=usePdf(refDiv)
  const [isError, setIsError] = useState(false);
  const [view, setView] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const [pageTable, setPageTable] = useState<number>(8);
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);
  
  //  const { data: posts, error } = useQuery({
  //    queryKey: ['getTempleteSession', props.id],
  //    queryFn: new BulkMessagesService().getDetailTemplateSession,
  //  });

  // const { data } = useQuery(['getTempleteSession', props.id], () =>
  //   new BulkMessagesService().getDetailTemplateSession(props.id)
  // );
      // console.log('dataBradcast=========', dataBradcast);
      // console.log('props=========', props.datas);

  const onGetExporProduct = async (title?: string, worksheetname?: string) => {
    try {
      // setLoading(true);
      // const response = await fetch('https://fakestoreapi.com/products');
      // Check if the action result contains data and if it's an array
      if (dataBradcast && Array.isArray(dataBradcast)) {
        const newArray = dataBradcast.map((item) => {
          delete item.response_id
          delete item.created_at
          delete item.phone_number_id
          delete item.session_id
          delete item.template_id
          delete item.id
             return {
               ...item,
               date: props.date,
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
        XLSX.writeFile(workbook, `${title}.xlsx`);
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
    if (props.datas && props.datas.length > 0) {
      setView(true)
     
    }
  },[])
  useEffect(() => {
    if (props.id !== '') {
      try {
        setIsLoad(true);
        setIsError(false);
        const response = new BulkMessagesService()
          .getDetailTemplateSession2(props.id)

          .then((result) => {
            // ;

            if (result.status == 200) {
              setDataBroadcast(result.data.data.broadcasts);
              setIsLoad(false);
            } else {
              setIsError(true);
            }
          })
          .catch((errors) => {
            console.log('errors',errors);
            
            setIsError(true);
          });
      } catch (error) {
        setIsLoad(false);
        setIsError(true);
            console.log('error', error);

      }
      //   setCurrentIdSession(idSession);
      //   setIdSession('');
    }
  }, [props.id]);

  const filteredItems = useMemo(() => {
    let filterTableTemple: DetailBroadcastTable[] = props.datas;

    if (dataBradcast && dataBradcast.length > 0) {
      filterTableTemple = dataBradcast;
      // ;
    }

    if (hasSearchFilter && filterTableTemple?.length > 0) {
      filterTableTemple = filterTableTemple.filter(
        (item: DetailBroadcastTable) =>
          item
            ?.phone!.toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase())
      );
    }

    return filterTableTemple;
  }, [filterValue, hasSearchFilter, dataBradcast, props.datas]);

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
    } else {
      setFilterValue('');
    }
  }, []);

  useEffect(() => {
    if (view) {
      imprimer();
      setView(false)
      if (props.datas && props.datas.length>0) {
        props.showHandler()
      }
      // console.log('view==========',view);
      
    }
  },[view])
  return (
    <div>
      <Modal
        isOpen={props.isShow}
        onOpenChange={() => {
          if (!isLoad) {
            props.showHandler();
          }
        }}
        className=" bg-white sm:px-4 px-0 sm:z-10 z-[5000]"
        radius="lg"
        placement="center"
        // closeButton={false}
        classNames={{
          // body: "py-6",
          // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          // header: "border-b-[1px] border-[#292f46]",
          // footer: "border-t-[1px] border-[#292f46]",
          // closeButton: 'hidden',
        }}
      >
        <ModalContent>
          <>
            <ModalBody className="text-black pb-0 mb-0">
              <div className="w-full h-full bg-white py-10">
                {!isLoad && ((dataBradcast && dataBradcast.length > 0) || (props.datas && props.datas.length>0)) && (
                  <div>
                    <div className="mt-6">
                      <div className="  ">
                        <Table
                          aria-label="Users table"
                          bottomContent={
                            <div className="md:flex block md:m-0 m-auto w-auto md:w-full justify-between">
                              <div className="flex text-black md:mb-0 mb-3 ">
                                {/* <label className="mr-2 mt-2 font-[VisbyCF-light]">
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
                                  <option key={pageTable}>{pageTable}</option> */}
                                {/* {selectOption.map((items) => {
                            if (items !== pageTable) {
                              return <option key={items}>{items}</option>;
                            }
                          })} */}
                                {/* </select> */}
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
                                classNames={{
                                  cursor: 'bg-[black] text-white',
                                }}
                              />
                            </div>
                          }
                          bottomContentPlacement="outside"
                          sortDescriptor={sortDescriptor}
                          onSortChange={setSortDescriptor}
                          classNames={{
                            wrapper: '  px-0 py-0 bg-white text-black',
                            thead: ' text-red-800 rounded-none bg-white',
                          }}
                        >
                          <TableHeader
                            columns={columns}
                            className="bg-transparent   text-red-800 hidden"
                          >
                            {columns.map((row, index) => {
                              return (
                                <TableColumn
                                  className="text-left h-14 text-[black] font-bold text-base"
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
                                  className="border-t-1  h-14 border-white py-2"
                                >
                                  <TableCell className="text-left py-4">
                                    {row?.phone}
                                  </TableCell>

                                  <TableCell
                                    className={`${row.status == 'failed' ? 'text-[red]' : 'text-black'}`}
                                  >
                                    {row?.status}
                                  </TableCell>
                                  <TableCell className=" text-black">
                                    {row?.error}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    <div className="flex mt-10 justify-end">
                      <div className="">
                        <Button
                          className="w-auto bg-transparent border border-red-600 text-red-500"
                          onClick={() => {
                            props.showHandler();
                          }}
                        >
                          cancel
                        </Button>
                      </div>
                      {/* <div>
                        <Button
                          onClick={() => {
                            onGetExporProduct('Report', 'ReportExport');
                            // setView(true);
                          }}
                          className="bg-[green] sm:w-auto w-full text-white font-bold mx-1"
                        >
                          xlsx
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            // onGetExporProduct('Report', 'ReportExport');
                            setView(true);
                          }}
                          className="bg-[red] sm:w-auto w-full text-white font-bold"
                        >
                          pdf
                        </Button>
                      </div> */}
                    </div>
                  </div>
                )}
                {isLoad && (
                  <>
                    <p className="text-center font-bold  text-xl my-5">
                      loading.......
                    </p>
                  </>
                )}

                {isError && (
                  <div>
                    <p className="text-center font-bold text-[red] text-xl my-5">
                      error occurred
                    </p>
                    <div className="flex mt-10 justify-end">
                      <div className="mr-2">
                        <Button
                          className="w-auto bg-transparent border border-red-600 text-red-500"
                          onClick={() => {
                            props.showHandler();
                          }}
                        >
                          cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`${view && !isLoad ? 'block' : 'hidden'} w-full pt-8`}
                ref={refDiv}
              >
                <Table
                  aria-label="Users table"
                  // sortDescriptor={sortDescriptor}
                  // onSortChange={setSortDescriptor}
                  classNames={{
                    wrapper: '  px-0 py-0 bg-white text-black',
                    thead: ' text-red-800 rounded-none bg-white',
                  }}
                >
                  <TableHeader
                    columns={columns2}
                    className="bg-transparent   text-red-800 hidden"
                  >
                    {columns2.map((row, index) => {
                      return (
                        <TableColumn
                          className="text-left h-14 text-[black] font-bold text-base"
                          key={index}
                        >
                          {row}
                        </TableColumn>
                      );
                    })}
                  
                  </TableHeader>
                  <TableBody items={filteredItems}>
                    {filteredItems.map((row, index) => {
                      return (
                        <TableRow
                          key={index}
                          className="border-t-1  h-14 border-white py-2"
                        >
                          <TableCell className="text-left py-4">
                            {row?.phone}
                          </TableCell>

                          <TableCell
                            className={`${row.status == 'failed' ? 'text-[red]' : 'text-black'}`}
                          >
                            {row?.status}
                          </TableCell>
                          <TableCell className=" text-black">
                            {row?.error}
                          </TableCell>
                          <TableCell>{props.date}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {/* <table
                  className={`${view && !isLoad ? 'block' : 'hidden'} w-full`}
                >
                  <thead className="border-1 border-black w-full">
                    {columns.map((item, index) => (
                      <th key={index} className="text-left">
                        {item}
                      </th>
                    ))}
                  </thead>
                  <tbody>
                    {dataBradcast.map((row, index) => {
                      return (
                        <tr
                          key={index}
                          className="  h-14 border-1 border-black w-full"
                        >
                          <td className="">{row?.phone}</td>

                          <td
                            className={`${row.status == 'failed' ? 'text-[red]' : 'text-black'} px-2`}
                          >
                            {row?.status}
                          </td>
                          <td className=" text-black">{row?.error}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table> */}
              </div>
              {/* <div className='mt-48'></div>
              <div
                ref={refDiv}
                className={`${view && !isLoad ? 'block' : 'hidden'}`}
              >
                <p className="bg-white text-3xl text-center">ok</p>
              </div> */}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModaldetailBroadcast;
