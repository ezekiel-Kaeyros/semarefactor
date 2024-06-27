import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Modal,
} from '@nextui-org/react';
import React from 'react';
import { ModalPropsType } from './modal';
import { Button } from '@/app/common/ui/button/Button';

const ScenarioModalFilter: React.FC<ModalPropsType & ModalProps> = ({
  children,
  title,
  isOpen,
  closeButtonTitle,
  validateButtonTitle,
  onClose,
  classStyle,
  iconTitle,
  onValidateButton,
  showFooter,
}) => {
  return (
    <Modal
      className={classStyle}
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 ml-[2%] font-[900] text-2xl">
              {title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>

            {showFooter ? (
              <ModalFooter>
                {/* {closeButtonTitle && (
                    <Button variant="secondary" onClick={onClose}>
                      {closeButtonTitle}
                    </Button>
                  )}
                  {validateButtonTitle && (
                    <Button onClick={onValidateButton}>
                      {validateButtonTitle}
                    </Button>
                  )} */}
                <Button
                  // disabled={  }
                  variant={'mainColor'}
                  // icon={ bulk_messageIcon }
                  // rightIcon={ true }
                  // leftIcon={ true }
                  iconSize={30}
                  onClick={onClose}
                  className="w-[15%]"
                >
                  {validateButtonTitle}
                </Button>
              </ModalFooter>
            ) : (
              ''
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ScenarioModalFilter;
