import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';

interface ModalInfoProps {
  onOpenFromParent?: (onOpen: () => void) => void;
  qrCode: any;
}

export const ModalInfo: React.FC<ModalInfoProps> = ({
  onOpenFromParent,
  qrCode,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  React.useEffect(() => {
    if (onOpenFromParent) {
      onOpenFromParent(onOpen);
    }
  }, [onOpenFromParent, onOpen]);

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Image src={qrCode} alt="qrcode" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
