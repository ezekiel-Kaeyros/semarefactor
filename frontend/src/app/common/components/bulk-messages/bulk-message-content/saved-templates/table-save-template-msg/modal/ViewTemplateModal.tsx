import PreviewComp from '@/app/common/components/forms/bulk-message-form/PreviewComp';
import usePdf from '@/app/hooks/usePdf';
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
import { useEffect, useRef } from 'react';

const ViewTemplateModal: React.FC<{
  isShow: boolean;
  showHandler: any;
  img: any;
  body: string;
  footer: string;
  exports?: boolean;
  data: {
    img: string;
    body: string;
    footer: string;
    id: string;
    name: string;
    url: string;
  }[];
}> = ({ isShow, showHandler, img, body, footer, exports, data }) => {
  const refDiv = useRef(null);
  const imprimer = usePdf(refDiv);

  useEffect(() => {
    if (exports) {
      imprimer();
      showHandler();
    }
  }, []);
  return (
    <Modal
      isOpen={isShow}
      onOpenChange={showHandler}
      className=" "
      placement="center"
      // closeButton={false}
      classNames={{
        wrapper: '',
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
          <ModalBody className="text-black p-10 w-full overflow-y-scroll no-scrollbar max-h-[78vh] ">
            {/* <p
              onClick={() => {
                showHandler();
              }}
            >
              x
            </p> */}
            <div className="w-full h-full border" ref={refDiv}>
              {/* {data?.length == 0 ? ( */}
              {data.length == 0 && (
                <PreviewComp
                  ImgTemplate={img}
                  // ImgTemplate={photographIcon}
                  textTemplate={body}
                  tagline={footer}
                />
              )}
              {/* ) : ( */}
              {data.length > 0 &&
                data.map((item) => (
                  <div key={item.name} className="h-screen">
                    <p>{item.name}</p>{' '}
                    <PreviewComp
                      ImgTemplate={item.img}
                      // ImgTemplate={photographIcon}
                      textTemplate={item.body}
                      tagline={item.footer}
                    />
                  </div>
                ))}
              {/* ))
              )} */}
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};
export default ViewTemplateModal;
