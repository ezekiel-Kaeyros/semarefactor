'use client';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import loginUserIcon from '../../../../../../../../../public/icons/scenario/tag-2.svg';
import logIcon from '../../../../../../../../../public/icons/scenario/box.svg';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthService, SenarioService } from '@/services';
import { useSenarioCreate } from '@/zustand_store';
import { getUserCookies } from '@/cookies/cookies';
import { Button } from '@/app/common/ui/button/Button';
type ScenarioType = {
  title: string;
  keywords: string;
  // "credential_id": "66672c59c615817051015d0c"
};
type ScenarioCreationType = {
  title: string;
  type: string;
  keywords: string[];
  credential_id: string;
};

export function InitialModal(props: { isUpdate: boolean }) {
  const { setInitialistionSenario, nameSenario } = useSenarioCreate();
  const [isOpen, setIsOpen] = useState(
    nameSenario === '' && !props.isUpdate ? true : false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<ScenarioType>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });
  function joinArrayToString(arr: string[]) {
    return arr.join(', ');
  }
  function splitStringAndRemoveSpaces(input: string) {
    const parts = input.split(',');
    const result = parts.map((part) => part.trim());
    return result;
  }

  const onSubmit: SubmitHandler<ScenarioType> = async (data) => {
    try {
      setIsLoading(true);
      const user = getUserCookies();
      const dataResponse: ScenarioCreationType = {
        title: data.title,
        type: 'client',
        keywords: splitStringAndRemoveSpaces(data.keywords ?? []),
        credential_id: user.credentials._id,
      };
      const response = new SenarioService()
        .initialCreateScenario(dataResponse)
        .then(async (result) => {
          if (result.status == 201) {
            setInitialistionSenario!({
              title: result.data.title,
              type: result.data.type,
              _id: result.data._id,
              active: result.data.active,
              credential_id: result.data.credential_id,
              keywords: result.data.keywords,
            });
            setIsOpen(false);
            toast.success('Initialisation successfull !!');
          } else {
            toast.error(
              'something wrong try again on the creation of scenario'
            );
          }
        })
        .catch((error) => {
          toast.error('something wrong try again on the creation of scenario');
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  //   console.log(getUserCookies());

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              Initialisation of scenario
            </ModalHeader>
            <ModalBody>
              <InputField
                register={register('title', { required: true })}
                icon={loginUserIcon}
                name="title"
                placeholder="Name of your scenario"
              />
              <InputField
                register={register('keywords', {
                  required: true,
                  minLength: 3,
                })}
                icon={logIcon}
                name="keywords"
                placeholder="Trigger Chatbot Keyword"
              />
            </ModalBody>
            <ModalFooter className=" flex justify-center">
              <Button color="primary" className=" font-semibold " type="submit">
                Initialisation
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
