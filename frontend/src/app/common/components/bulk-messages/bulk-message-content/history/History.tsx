import React, { useEffect, useState } from 'react';
import EmptyHistory from './empty-history/EmptyHistory';

import FilledBulkMessage from '../saved-templates/filled-bulk-message/FilledBulkMessage';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { BulkMessagesService } from '@/services';
import App from '@/app/common/ui/table/CustomTable';
import TableHistoryTemplete from '../saved-templates/filled-bulk-message/TableHistoryBulkMessage/TableHistoryBulkMessageTemplate';
// import App from './tableBulk/TableBulk';
const History = () => {
  const [singleTable,setSingleTable]=useState<any>([])
  const { data: posts, isLoading } = useQuery({
    queryKey: ['getTempleteSession'],
    queryFn: new BulkMessagesService().getTemplateSession,
  });
  useEffect(() => { 
    if (posts && posts?.data && posts?.data.length > 0) {
      // const tableauSansDoublons = posts?.data.filter((item:any, index:number) => {
      //   return posts?.data.indexOf(item.template_name) === index;
      // });

      const ids = new Set();
      const tableauSansDoublons = posts?.data.filter((item:any) => {
        if (ids.has(item.template_name)) {
          return false;
        } else {
          ids.add(item.template_name);
          return true;
        }
      });

      setSingleTable(tableauSansDoublons);
    }
  },[posts])
  return (
    <div>
      {isLoading ? (
        <p className="text-center text-2xl h-[70vh] flex place-items-center w-full justify-center">
          {/* <p>chargement patientez...</p> */}
          <Spinner label="Loading . . . " color="primary" size="lg" />
        </p>
      ) : posts &&
        posts?.data &&
        posts?.data.length > 0 &&
        singleTable.length > 0 ? (
        // console.log(posts)

        <TableHistoryTemplete
          tableSession={singleTable}
          multibleTable={posts.data.reverse()}
        />
      ) : (
        <EmptyHistory />
      )}
    </div>
  );
};

export default History;
