import { Button } from '@/app/common/ui/button/Button';
import usePdf from '@/app/hooks/usePdf';
import { BulkMessagesService } from '@/services';
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


const columns2 = ['phone', 'status', 'reason', 'date'];
const ModaldetailBroadcastExport: React.FC<{
  isShow: boolean;
  showHandler: any;
  id: string;
  date: string;
  datas: {id:string,tab:any[]}[];
}> = (props) => {

  const refDiv = useRef<any>(null);
  const imprimer = usePdf(refDiv);
  const [isError, setIsError] = useState(false);
  const [view, setView] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const [pageTable, setPageTable] = useState<number>(8);
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);


//   const onGetExporProduct = async (title?: string, worksheetname?: string) => {
//     try {
  
//       if (dataBradcast && Array.isArray(dataBradcast)) {
//         const newArray = dataBradcast.map((item) => {
//           delete item.response_id;
//           delete item.created_at;
//           delete item.phone_number_id;
//           delete item.session_id;
//           delete item.template_id;
//           delete item.id;
//           return {
//             ...item,
//             date: props.date,
//           };
//         });
    
//         const workbook = XLSX.utils.book_new();
//         const worksheet = XLSX.utils?.json_to_sheet(newArray);
//         XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
//         // Save the workbook as an Excel file
//         XLSX.writeFile(workbook, `${title}.xlsx`);
//         console.log(`Exported data to ${title}.xlsx`);
//         // setLoading(false);
//       } else {
//         // setLoading(false);
//         // console.log('#==================Export Error');
//       }
//     } catch (error: any) {
//       // setLoading(false);
//       console.log('#==================Export Error', error.message);
//     }
//   };
  useEffect(() => {
   
      imprimer()
       props.showHandler();
    
  }, []);
  

  
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
      >
        <ModalContent>
          <>
            <ModalBody className="text-black pb-0 mb-0">
                          <div className={` w-full pt-8`} ref={refDiv}>
                              <h1>Exportation en pdf</h1>
                {props.datas.map((item,index) => (
                  <div key={index} className='pt-10'>
                    <Table
                      aria-label="Users table"
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
                      <TableBody items={item.tab}>
                        {item.tab.map((row: any, index) => {
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
                              <TableCell>
                                {row.created_at ? row.created_at.split('T')[0].split('-')[2] +
                                  '-' +
                                  row.created_at.split('T')[0].split('-')[1] +
                                  '-' +
                                  row.created_at.split('T')[0].split('-')[0] +
                                  ' ' +
                                  row.created_at.split('T')[1].split(':')[0] +
                                  ':' +
                                  row.created_at.split('T')[1].split(':')[1] : ''}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModaldetailBroadcastExport;
