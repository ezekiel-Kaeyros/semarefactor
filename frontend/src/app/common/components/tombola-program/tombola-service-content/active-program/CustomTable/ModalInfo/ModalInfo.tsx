import React from 'react';
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
import EditIcon from '../../../../../../../../../public/icons/edit.svg';
import bagPack from '../../../../../../../../../public/tombola/bagPack.svg';
import fashion from '../../../../../../../../../public/tombola/fashion.svg';
import gucci from '../../../../../../../../../public/tombola/gucciBag.svg';
import Tenis from '../../../../../../../../../public/tombola/tenis.svg';
import iconBtn from '../../../../../../../../../public/tombola/Vector.svg';
import Product from './product/Product';
import { Button } from '@/app/common/ui/button/Button';

export default function ModalInfo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps['scrollBehavior']>('inside');

  return (
    <>
      <Image
        onClick={onOpen}
        src={EditIcon}
        alt="Icon edit"
        className="cursor-pointer"
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        placement="center"
        scrollBehavior={scrollBehavior}
        classNames={
          {
            // base: "max-h-fit",
          }
        }
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tombola Program Info
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col mb-2">
                  <p className="text-[#FAF9F9] text-base font-normal">
                    Program Name
                  </p>
                  <p className="text-[#FAF9F9] text-sm font-extralight">
                    Loyalty PG
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[#FAF9F9] text-[16px] font-normal">
                    N° Of Products
                  </h3>
                  <p className="text-[#FAF9F9] text-[14px] font-extralight">
                    10
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className="text-[#FAF9F9] text-[16px] font-normal mb-1">
                    Product List
                  </h3>
                  <Product />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="w-[20%] mx-auto  max-sm:w-[50%]">
                  <Button
                    variant="bgTransparent"
                    icon={iconBtn}
                    rightIcon={true}
                    iconSize={15}
                  >
                    See More
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
