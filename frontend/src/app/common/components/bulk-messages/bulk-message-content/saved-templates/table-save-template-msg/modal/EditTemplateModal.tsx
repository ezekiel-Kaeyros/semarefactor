import EditBulkMessageForm from '@/app/common/components/forms/bulk-message-form/EditBulkMessageFom';
import PreviewComp from '@/app/common/components/forms/bulk-message-form/PreviewComp';
import CustomModal from '@/app/common/ui/modal/Modal';
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
const EditTemplateModal: React.FC<{
  isShow: boolean;
  showHandler: any;
  img: any;
  body: string;
    footer: string;
    id: string;
    name: string;
  refresh: any,
    url:string
}> = ({ isShow, showHandler, img, body, footer,id ,name, refresh,url}) => {
  return (
    <CustomModal
      title={''}
      // showFooter={false}
      isOpen={isShow}
      closeButtonTitle={'close'}
      validateButtonTitle={'Create'}
      onClose={showHandler}
      classStyle={'bg-mainDark max-w-screen-lg w-[1000px]'}
      iconTitle={'icon'}
    >
      <EditBulkMessageForm
        name={name}
        id={id}
        img={img}
        modalHandler={showHandler}
        // ImgTemplate={photographIcon}
        body={body.replace(/(<([^>]+)>)/gi, '')}
              footer={footer}
        refresh={refresh}
        image_url={url}
      />
    </CustomModal>
  );
};
export default EditTemplateModal;
