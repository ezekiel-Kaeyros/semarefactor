import React, { useState } from 'react';
import { AssignVariableNodeType } from './types';
import Image from 'next/image';
import trashIcon from '../../../../../../../../../../../public/icons/chatbot/trash.svg';
import tagIcon from '../../../../../../../../../../../public/icons/chatbot/tag-2.svg';
import attachIcon from '../../../../../../../../../../../public/icons/chatbot/attach-circle.svg';
import categoryIcon from '../../../../../../../../../../../public/icons/chatbot/category-2.svg';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { InputModalNode } from '../../../InputModalNode';
import { SelectModalNode } from '../../../SelectModalNode';

function AssignVariableNode({ id, deletefc }: AssignVariableNodeType) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nameVariable, setNameVariable] = useState<string>(' name of variable');
  return (
    <div className="bg-mainDarkLight  w-full rounded-lg flex nodrag px-2  place-items-start py-2">
      <div className=" w-full">
        <div className=" w-20 px-2 rounded-xl h-6 place-items-center bg-gray-600 flex justify-between">
          <p className=" text-[11px]">Variable</p>
          <Image
            src={tagIcon}
            alt=""
            width={18}
            height={18}
            className=" nodrag "
            // onClick={() => deletefc(id)}
          />
        </div>
        <input
          onClick={onOpen}
          value={'@' + nameVariable}
          className=" appearance-none rounded-lg border-none focus:outline-none h-5 w-full font-[visby-medium] p-1.5 bg-mainDarkLight text-[12px]  "
          id={id}
          readOnly
        />
      </div>
      <Image
        src={trashIcon}
        alt=""
        width={12}
        height={12}
        className=" nodrag cursor-pointer"
        onClick={() => deletefc(id)}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className=" p-3">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className=" text-2xl">Variable Options</h1>
              </ModalHeader>
              <ModalBody>
                <div className=" w-full flex flex-col gap-3">
                  <SelectModalNode
                    placehoder="Enter variable name"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setNameVariable(e.target.value)
                    }
                    value={nameVariable}
                    icon={
                      <Image
                        src={attachIcon}
                        alt=""
                        width={24}
                        height={24}
                        className=" nodrag "
                      />
                    }
                  />
                  <InputModalNode
                    placehoder="Choose variable type"
                    icon={
                      <Image
                        src={categoryIcon}
                        alt=""
                        width={24}
                        height={24}
                        className=" nodrag "
                      />
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter className=" pt-10">
                <Button
                  color="default"
                  className=" bg-mainDarkLight rounded-full"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  className=" rounded-full"
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export { AssignVariableNode };
