import BulkMessage from '@/app/modules/bulk-messages/bulkMessage';
import React from 'react';
import { sessionImport } from '@/utils/importSession';

const BulkMessagePage = () => {
  return (
    <div className=" w-full">
      <BulkMessage />
    </div>
  );
};

export default BulkMessagePage;
