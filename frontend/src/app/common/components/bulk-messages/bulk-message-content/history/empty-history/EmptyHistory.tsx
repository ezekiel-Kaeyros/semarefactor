import React from 'react';

import emptyHistoryIcon from '../../../../../../../../public/emptyHistory.png';
import EmptyUIComp from '@/app/common/components/bulk-messages/empty-ui/EmptyUI';

const EmptyHistory = () => {
  return (
    <EmptyUIComp
      bigContainerStyle={
        'w-[100%] h-[100%] grid justify-items-center gap-[1.5rem] mt-[10rem] content-center'
      }
      LogoOfEmptyPage={emptyHistoryIcon}
      bigTitle={'No History'}
      secondaryTitle={'Get started by creating a template message'}
    />
  );
};

export default EmptyHistory;
