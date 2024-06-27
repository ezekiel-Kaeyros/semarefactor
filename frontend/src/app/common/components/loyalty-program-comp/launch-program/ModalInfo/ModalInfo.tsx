import React, { FC } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalProps,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import information from '../../../../../../../public/icons/information.svg';
import iconBtn from '../../../../../../../public/tombola/tenis.svg';
import { useQuery } from '@tanstack/react-query';

interface Item {
  items?: any;
}

export const ModalInfo: FC<Item> = ({ items }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps['scrollBehavior']>('inside');
  // ;
  const handleClick = (id: any) => {
    const selectedData = items.find((item: any) => item.id === id);
  };

  return (
    <>
      <Image
        onClick={() => onOpen}
        src={information}
        alt="Icon edit"
        className="cursor-pointer"
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        placement="center"
        scrollBehavior={scrollBehavior}
        classNames={{}}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="mt-5">
                  <h3 className="text-[#FAF9F9] text-[16px] font-normal mb-1">
                    Product List
                  </h3>
                  {/* <Product /> */}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
