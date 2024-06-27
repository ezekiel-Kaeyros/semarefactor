import App from '@/app/common/ui/table/CustomTable';
import { BulkMessagesService } from '@/services';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import TableHistoryTemplete from './TableHistoryBulkMessage/TableHistoryBulkMessageTemplate';

const FilledBulkMessage:React.FC<{tableSession:any[]}> = ({tableSession}) => {
  const { data: posts, error } = useQuery({
    queryKey: ['getTempleteSession'],
    queryFn: new BulkMessagesService().getTemplateSession,
  });
  useEffect(() => {
    if (posts) {
      // ;
    }
  }, [posts]);

  return (
    <div>
      {posts && posts?.data && posts?.data.length > 0 && (
        <TableHistoryTemplete tableSession={tableSession} />
      )}
    </div>
  );
};

export default FilledBulkMessage;
