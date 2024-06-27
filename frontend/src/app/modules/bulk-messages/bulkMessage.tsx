'use client';
import { Button } from '@/app/common/ui/button/Button';
import React, { useEffect, useState } from 'react';

import bulk_messageIcon from '../../../../public/right_side_bar/bulk_message.png';
import BulkMessageTabs from '@/app/common/components/bulk-messages/bulk-message-tabs/BulkMessageTabs';
import BulkMessageContent from '@/app/common/components/bulk-messages/bulk-message-content/BulkMessageContent';
import CustomModal from '@/app/common/ui/modal/Modal';
import { useModal } from '@/app/hooks/useModal';
import {
  toggleCloseModal,
  toggleOpenModal,
} from '@/redux/features/modal-slice';
import BulkMessageForm from '@/app/common/components/forms/bulk-message-form/BulkMessageForm';
import ChoosePricing from '@/app/common/components/bulk-messages/payment-mode/choose-pricing/ChoosePricing';
import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@/services';
import { useRouter } from 'next/router';
import Image from 'next/image';

const BulkMessage = () => {
  // const { user }=useAuth()
  const { modalTogle, dispatch } = useModal();
  const [modalPricing, setModalPricing] = useState(false);
  const viewPricingHandler = () => {
    setModalPricing((modalPricing) => !modalPricing);
  };
  const handleOnClickOpenModal = () => {
    dispatch(toggleOpenModal(true));
  };
  //  const router = useRouter();
  //  const { tab } = router.query;
  //   useEffect(() => {
  //   user && // ;

  // },[user])
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['postsData'],
    queryFn: new AuthService().retrievePosts,
  });

  // ;
  // ;
  // ;

  const handleOnClickCloseModal = () => {
    dispatch(toggleCloseModal(false));
  };

  return (
    <div className="h-full">
      <div className="px-[1rem] py-[2rem] h-full">
        <div>
          <h1
            style={{
              fontFamily: 'visby-bold',
            }}
            className="text-[32px]"
          >
            Bulk Message
          </h1>
        </div>
        <div className="flex items-center justify-between  gap-2">
          <div className="sm:text-sm text-xs">
            <BulkMessageTabs />
          </div>
          <div>
            <button
              onClick={() => handleOnClickOpenModal()}
              className="sm:text-base text-xs flex md:gap-3  sm:justify-between justify-center items-center  sm:px-4 px-2 py-2 rounded-full bg-primary font-semibold"
            >
              <Image src={bulk_messageIcon} alt="" className="md:h-8 h-5 md:w-8 w-5" />
              <span>Create Template</span>
            </button>
          </div>
        </div>
        <div className="p-[1rem] h-full ">
          <BulkMessageContent />
        </div>
      </div>

      <ChoosePricing view={modalPricing} close={viewPricingHandler} />
      <CustomModal
        title={''}
        // showFooter={false}
        isOpen={modalTogle}
        closeButtonTitle={'close'}
        validateButtonTitle={'Create'}
        onClose={() => handleOnClickCloseModal()}
        classStyle={'bg-mainDark max-w-screen-lg w-[1000px]'}
        iconTitle={'icon'}
      >
        <BulkMessageForm modalHandler={handleOnClickCloseModal} />
      </CustomModal>
    </div>
  );
};

export default BulkMessage;
