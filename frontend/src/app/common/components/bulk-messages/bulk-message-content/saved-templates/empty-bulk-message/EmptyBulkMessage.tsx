import React from 'react';

import emptyBulkMessageIcon from '../../../../../../../../public/emptyBulkMessage.png';
import Image from 'next/image';
import EmptyUIComp from '@/app/common/components/bulk-messages/empty-ui/EmptyUI';
import App from '@/app/common/ui/table/CustomTable';

const EmptyBulkMessage = () => {
  return (
    <>
      <EmptyUIComp
        bigContainerStyle={
          'w-[100%] h-[100%] grid justify-items-center gap-[1.5rem] mt-[10rem] content-center'
        }
        LogoOfEmptyPage={emptyBulkMessageIcon}
        bigTitle={'No saved template'}
        secondaryTitle={'Get started by creating a template message'}
      />
    </>
  );
};

export default EmptyBulkMessage;
