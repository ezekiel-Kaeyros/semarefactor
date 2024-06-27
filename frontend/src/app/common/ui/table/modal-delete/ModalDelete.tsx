import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import Image from "next/image";
import ArchiveIcon from '../../../../../../public/icons/stat/Archive 1.svg';
import DeleteIcon  from '../../../../../../public/icons/deleteIcon.svg';


export default function ModalDelete() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      {/* <span onClick={onOpen} className="text-lg text-white hover:text-danger-500 cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span> */}
      <Image src={DeleteIcon} alt='' onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xs"
        classNames={{
          closeButton: 'hidden',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-3">
                <Image alt="archive icon" src={ArchiveIcon} />
                <h1>Delete Template </h1>
              </ModalHeader>
              <ModalBody>
                <div className="flex py-2 px-1 justify-between">
                  <p className="font-thin ">
                    Are you sure you want to delete this message?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="full"
                  color="default"
                  variant="bordered"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  radius="full"
                  className="text-white bg-[#B00020]"
                  onPress={onClose}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
