import ModalDelete from "@/app/common/ui/table/modal-delete/ModalDelete";
import { Button, CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import * as XLSX from 'xlsx';
import exportIcon from '../../../../../public/export.png';

const ItemTable:React.FC<{user:any}>=({user}) => {
    return (
      <div>
      
        <div className="flex flex-row  items-center gap-3">
          <input
            id={user.template_name}
            type="checkbox"
            className="h-4 w-4 cursor-pointer"
            onClick={() => {
              //  console.log('arrayImport',arrayImport);

            //   if (arrayImport.length > 0) {
            //     const value = arrayImport.filter((item) => item.id == user?.id);
            //     if (value.length > 0) {
            //       const del = arrayImport.filter((item) => item.id != user?.id);
            //       setArrayImport([...del]);
            //       console.log('del', del);
            //     } else {
            //       const add = arrayImport;
            //       add.push({
            //         id: user.id,
            //         tab: user?.broadcasts ? user?.broadcasts : [],
            //       });
            //       setArrayImport([...add]);
            //       console.log('add', add);
            //     }
            //   } else {
            //     const add = arrayImport;
            //     add.push({
            //       id: user.id,
            //       tab: user?.broadcasts ? user?.broadcasts : [],
            //     });
            //     setArrayImport([...add]);
            //     console.log('add');
            //   }
              // console.log('value',value);
            }}
          />
          <label
            className="text-bold text-small capitalize font-normal cursor-pointer "
            onClick={() => {
              // ;
            //   setValueArray(undefined);
            //   setIdSession(user?.id);
            //   setDateSession(
            //     user.created_at.split('T')[0].split('-')[2] +
            //       '-' +
            //       user.created_at.split('T')[0].split('-')[1] +
            //       '-' +
            //       user.created_at.split('T')[0].split('-')[0] +
            //       ' ' +
            //       user.created_at.split('T')[1].split(':')[0] +
            //       ':' +
            //       user.created_at.split('T')[1].split(':')[1]
            //   );
            //   setIsShowModal((isShowModal) => !isShowModal);
            }}
          >
            {user.template_name}
          </label>
        </div>
       
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
     
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize font-normal">
            {user?.broadcasts ? user?.broadcasts.length : 0}
          </p>
        </div>
      
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
     
        <div className="flex flex-row ">
          <CircularProgress
            size="lg"
            classNames={{
              indicator: 'text-[green]',
              // value: 'text-[green]',
            }}
            value={
              user?.broadcasts
                ? user?.broadcasts.filter((item: any) => item.status == 'read')
                    .length
                : 0
            }
            // color="success"
            // formatOptions={{ style: "unit", unit: "kilometer" }}
            showValueLabel={true}
            maxValue={user?.broadcasts && user?.broadcasts.length}
            formatOptions={{ style: 'decimal' }}
          />
        </div>
       
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
                  console.log('#==================Export Error', error.message);
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
                // setValueArray(user?.broadcasts);
                // setIsShowModal(true);
                // setDateSession(
                //   user.created_at.split('T')[0].split('-')[2] +
                //     '-' +
                //     user.created_at.split('T')[0].split('-')[1] +
                //     '-' +
                //     user.created_at.split('T')[0].split('-')[0] +
                //     ' ' +
                //     user.created_at.split('T')[1].split(':')[0] +
                //     ':' +
                //     user.created_at.split('T')[1].split(':')[1]
                // );
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
     
      </div>
    );
}

export default ItemTable