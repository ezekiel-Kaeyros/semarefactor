import React from 'react';
import Image from 'next/image';

import { ScenarioCardProps } from './ScenarioCard.d';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import EditIcon from '../../../../../../../public/icons/chatbot/editIcon.svg';
import InformationIcon from '../../../../../../../public/icons/chatbot/information.svg';
import DeleteIcon from '../../../../../../../public/icons/chatbot/deleteIcon.svg';
import ArchiveIcon from '../../../../../../../public/icons/chatbot/Archive 1.svg';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SenarioService } from '@/services';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  isActive,
  name,
  numberOfQuestions,
  id,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  async function deletSenario(id: string) {
    const response = await new SenarioService().delete(id);
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error('Unable to load all scenarios');
      return new Error('Failed to fetch data');
    }
  }
  const mutation = useMutation({
    mutationFn: deletSenario,
    onSuccess: () => {
      toast.success('The scenario has been successfully removed !!!');
      queryClient.invalidateQueries({ queryKey: ['listSenarios'] });
    },
  });
  return (
    <div className="rounded-lg p-4 bg-mainDarkLight w-72 max-w-lg">
      <div className="flex justify-between items-center">
        <h1>{name}</h1>
        {(isActive && (
          <div className="px-3 py-.5 bg-[#E9FBF1] rounded-full">
            <h1 className="text-[#157A3F]">Active</h1>
          </div>
        )) || (
          <div className="px-3 py-.5 bg-[#FFDBE2] rounded-full">
            <h1 className="text-[#B00020]">Inactive</h1>
          </div>
        )}
      </div>
      <div className="flex my-6 justify-between text-grayText font-[articulat]">
        <h1>Questions</h1>
        <h1>{numberOfQuestions}</h1>
      </div>
      {/* Actions section */}
      <div className="ml-auto flex gap-x-2 w-fit">
        <AnimateClick>
          <a href={'/dashboard/scenarios/' + id}>
            <Image src={EditIcon} alt="Edit icon" />
          </a>
        </AnimateClick>
        <AnimateClick>
          <Image src={InformationIcon} alt="Edit icon" />
        </AnimateClick>
        <AnimateClick>
          <Image onClick={onOpen} src={DeleteIcon} alt="Delete icon" />
        </AnimateClick>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className=" p-3">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Image src={ArchiveIcon} alt="" width={30} />

                <h1 className=" text-2xl">Delete Template</h1>
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this message?</p>
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
                  color="danger"
                  className=" rounded-full"
                  onPress={() => {
                    mutation.mutate(id);
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ScenarioCard;
