import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import { getStatusInCookie, setStatusInCookie } from '@/cookies/cookies';
import {
  setCurrentChatStatus,
  setFilteredStatus,
  setSelectedStatus,
} from '@/redux/features/chat-bot-slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StatusFitlerProps } from './StatusFilter.d';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

interface SelectedChatProps {
  id: number;
  status: string;
  numberOfChats: string;
  color: string;
}

const SecondStatusFilter: React.FC<StatusFitlerProps> = ({
  handleSelect,
  options,
  selectedStatus,
  onStatusChange,
  conversation,
  realTimeStatusArr,
}) => {
  const [selected, setSelected] = useState(
    'all'
  );
  // getStatusInCookie(options[0].status);
  const [selectedColor, setSeletedColor] = useState('');
  // const [selectedColor, setSeletedColor] = useState('');
  const dispatch = useDispatch();
  const { currentChatStatus } = useSelector(
    (state: RootState) => state.setCurrentChatStatus
  );
  const router = useRouter();

  const handleStatusChange = (status: string | any) => {
    setSelected(status);
    onStatusChange(status);
    // dispatch(setFilteredStatus(status));
    // dispatch(setSelectedStatus(status));
    // router.push(`/en/dashboard/chatbot`);
    // dispatch(setCurrentChatStatus(null));
    // setSelected(getStatusInCookie(status));
    // onStatusChange(getStatusInCookie(status));
    // setStatusInCookie(status);
  };

  // Step 1: Initialize statusCount with all statuses from the options array, setting counts to 0
  const statusCount = options.reduce((acc: any, option) => {
    if (option.status !== 'All') {
      acc[option.status] = 0;
    }
    return acc;
  }, {});

  // Step 2: Count the occurrences of each status in the statusArray
  // realTimeStatusArr?.forEach((status: any) => {
  //   if (statusCount.hasOwnProperty(status)) {
  //     statusCount[status]++;
  //   }
  // });

  // Step 3: Update the options array with the status counts
  const updatedOptions = options.map((option) => {
    const count = statusCount[option.status] || 0;
    return {
      ...option,
      Status_number: count,
    };
  });

  return (
    <div>
      <div className="flex">
        {updatedOptions?.map((option, key) => {
          // const isActive = currentChatStatus
          //   ? currentChatStatus === option.status
          //   : selected === option.status;
          return (
            <AnimateClick key={key}>
              <div
                // className={`py-2 px-2 flex justify-between rounded-md items-center gap-x-2 ${isActive ? 'bg-gray-900' : ''}`}
                className={`py-2 px-2 flex justify-between rounded-md items-center gap-x-2 cursor-pointer ${selected == option?.status ? 'bg-gray-900' : ''}`}
                onClick={() => {
                  handleSelect && handleSelect(option?.status),
                    setSelected(option.status),
                    setSeletedColor(option.color);
                  handleStatusChange(option.status);
                }}
              >
                {option?.status}
                <div
                  style={{ backgroundColor: `${option?.color}` }}
                  className="w-5 h-5 p-1 text-xs rounded-md flex justify-center items-center font bold"
                >
                  <span className="mt-0.5">
                    {option.status !== 'All' &&
                      conversation.filter(
                        (item) => item.status == option.status
                      ).length}
                  </span>
                </div>
              </div>
            </AnimateClick>
          );
        })}
      </div>
    </div>
  );
};

export default SecondStatusFilter;
