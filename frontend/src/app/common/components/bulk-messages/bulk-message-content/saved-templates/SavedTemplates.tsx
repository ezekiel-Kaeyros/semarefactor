'use client';
import React, { useEffect, useState } from 'react';

import EmptyBulkMessage from './empty-bulk-message/EmptyBulkMessage';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import TableSaveTemplete from './table-save-template-msg/TableSaveTemplete';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {BulkMessagesService} from '@/services';
import { queries } from '@testing-library/react';

const SavedTemplates = () => {
  const [isRefresh, setIsRefesh] = useState(false);
  const clientQuery = useQueryClient();
  const refreshHandler = () => {
    setIsRefesh(true)
  }
   const { data: posts, error } = useQuery({
     queryKey: ['getTemplete'],
     queryFn: new BulkMessagesService().getTemplateByClient,
   });
  useEffect(() => {
    if (isRefresh) {
      clientQuery.invalidateQueries({ queryKey: ['getTemplete'] });
      setIsRefesh(false)
    }
  }, [isRefresh]);
  const { TableTemplete } = useBolkMessage();
  return (
    <div>
      {/* <FilledBulkMessage /> */}
      {posts && posts.data && posts.data.length > 0 ? (
        <TableSaveTemplete data={posts.data.reverse()} delete={ refreshHandler} />
      ) : (
        <EmptyBulkMessage />
      )}
      {/* <BulkMessageForm /> */}
    </div>
  );
};

export default SavedTemplates;
