// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import EmptyChatboxMessageImg from '../../../../../../public/icons/chatbot/emptyMessage.svg';

// import {
//   setChats,
//   setCompanyChats,
//   setCompanyId,
//   setConversationChats,
//   setCurrentChatStatus,
//   toggleDisplayChatUI,
// } from '@/redux/features/chat-bot-slice';
// import { io } from 'socket.io-client';

// import ChatHeader from './chat-header/ChatHeader';
// import ChatItem from './chat-item/ChatItem';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { formatDate, sortDataByDate } from '@/utils/utils';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { BACKEND_CHATBOT_API_URL } from '@/utils/backendUrls';
// import Skeleton from './Skeleton';
// import { allConersationType, conversationType } from '@/utils/types';
// import { ChatsByCompanyReturnType } from '@/redux/features/types';
// import Image from 'next/image';
// import {
//   ChatbotService,
//   ChatConversationType,
//   ChatMessageType,
// } from '@/services';
// import {
//   getStatusInCookie,
//   getUserCookies,
//   setStatusInCookie,
// } from '@/cookies/cookies';
// import { input } from '@nextui-org/react';
// import { useNumberConversationsData } from '@/zustand_store/numberConversation-store';
// import { useGlobalContext } from '@/app/common/contex-provider';
// import { RootState } from '@/redux/store';
// import { useSelector } from 'react-redux';

// const ChatbotLeftSidebar = () => {
//   const { setNb } = useNumberConversationsData();
//   const dispatch = useDispatch();
//   const [check, setChecked] = useState('');
//   const [inputValue, setInputValue] = useState<string>('');
//   // const [selectedStatus, setSelectedStatus] = useState(
//   //   getStatusInCookie('All')
//   // );
//   const { selectedStatus } = useSelector(
//     (state: RootState) => state.setSelectedStatus
//   );

//   const { arrayStatus } = useSelector(
//     (state: RootState) => state.setArrayStatus
//   );

//   // handling leftsidebard status individual
//   const [selectedChatStatus, setSelectedChatStatus] = useState<string | null>(
//     null
//   );

//   const { selectedScenarioLabel } = useGlobalContext();

//   // Function to update selectedStatus when dropdown value changes
//   const handleStatusChange = (status: any) => {
//     // setSelectedStatus();
//     setStatusInCookie(status);
//     // setSelectedStatus(getStatusInCookie(status));
//     //  getStatusInCookie(options[0].status);
//   };

//   const handleSelected = (item: any) => {
//     setSelectedChatStatus(
//       // item.chat_messages[item.chat_messages.length - 1].chat_status
//       [...item.chat_messages].reverse()[0].chat_status
//     );
//     dispatch(
//       setCurrentChatStatus([...item.chat_messages].reverse()[0].chat_status)
//     );
//     if (check != item.phone_number) {
//       setChecked(item.phone_number);
//       dispatch(toggleDisplayChatUI(true));
//       dispatch(setChats(item));
//     } else {
//       setChecked('');
//       dispatch(toggleDisplayChatUI(false));
//       dispatch(setChats([]));
//     }
//   };
//   let token = '100609346426084';
//   // ;

//   // Fetching all chats
//   const loadChatsByCompany = async () => {
//     const hisEmail = getUserCookies().email;

//     const response = await new ChatbotService().loadChatsByCompany({});

//     // console.log(response, 'responseData');
//     // if (response) {
//     //   dispatch(setConversationChats(response.data.conversations));
//     //   dispatch(setCompanyChats(response.data));
//     //   dispatch(setCompanyId(response.data.phone_number_id));
//     //   setNb(response.data.conversations.length);
//     //   return response.data;
//     // } else {
//     //   return new Error('Failed to fetch data');
//     // }
//   };

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['chatsByCompany', token],
//     queryFn: () => loadChatsByCompany(),
//   });

//   let newData: ChatConversationType[] | any =
//     !(data instanceof Error) &&
//     data &&
//     data &&
//     Array.isArray(data.conversations) &&
//     data.conversations.length > 0 &&
//     data.conversations;
//   let newDataCloned;
//   if (newData) {
//     newDataCloned = newData?.slice();
//   }

//   const [filteredChats, setFilteredChats] =
//     useState<ChatConversationType[]>(newDataCloned);

//   //  ;

//   const filtered = newDataCloned?.filter(
//     (item: ChatConversationType) =>
//       [...item.chat_messages].reverse()[0].chat_status === selectedStatus
//   );

//   const filteredSelected =
//     selectedStatus === 'All' || selectedStatus == '' ? newDataCloned : filtered;

//   // handleInput Change
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const inputTagrgeValue = event.target.value;
//     setInputValue(inputTagrgeValue);

//     const filteredNumbers = filteredSelected.filter(
//       (item: ChatConversationType) => {
//         return item.phone_number.includes(inputTagrgeValue);
//       }
//     );
//     setFilteredChats(filteredNumbers);
//   };

//   // const [filteredChatsConversation, setFilteredChatsConversation] =
//   //   useState<ChatConversationType[]>([]);

//   const InputFiltered = !inputValue ? filteredSelected : filteredChats;

//   const sortedChatsByDate =
//     typeof data !== 'undefined' &&
//     !(data instanceof Error) &&
//     data?.conversations
//       ? sortDataByDate(data.conversations)
//       : [];
//   const filteredConversations = InputFiltered?.filter(
//     (item: ChatConversationType) =>
//       item.chat_messages.some(
//         (item: ChatMessageType) => item.scenario_name === selectedScenarioLabel
//       )
//   );

//   const mappedConversations =
//     filteredConversations?.length !== 0 ? filteredConversations : InputFiltered;

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: () => {
//       return Promise.resolve();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['chatsByCompany'] });
//     },
//   });
//   useEffect(() => {
//     const socket = io('https://back.chatbot.sem-a.com');

//     function filterKeys() {
//       socket.onAny((eventName, ...args) => {
//         if (eventName.startsWith('message')) {
//           mutation.mutate();
//         }
//       });
//     }
//     filterKeys();
//     return () => {
//       socket.offAny();
//       socket.close();
//     };
//   }, []);

//   const getStatus = (item: any) => {
//     return arrayStatus.length > 0 &&
//       arrayStatus.filter((e) => e.id == item.phone_number).length > 0
//       ? arrayStatus.filter((e) => e.id == item.phone_number)[0].status
//       : [...item.chat_messages].reverse()[0].chat_status;
//   };

//   // const statuses = mappedConversations?.map((item: any) => getStatus(item));
//   const statuses = newDataCloned?.map((item: any) => getStatus(item));

//   // console.log(statuses, 'statuses');

//   return (
//     <div className="transition-all duration-300 ease-in-out delay-150 border-slate-600  dark:bg-mainDark border-r-[0.02px] h-full overflow-y-hidden">
//       <div className="flex flex-col gap-[1.5rem] p-[1rem] h-auto">
//         <div className="flex flex-row justify-between p-[.5rem]">
//           <ChatHeader
//             conversation={newDataCloned}
//             selectedStatus={selectedStatus}
//             onStatusChange={handleStatusChange}
//             onInputChange={handleInputChange}
//             realTimeStatusArr={statuses}
//           />
//         </div>
//       </div>

//       {/* <div className="flex flex-col bg-bgBlackForBtn gap-[1.5rem]  w-full "> */}
//       {!data && (
//         <div className="flex flex-col items-center h-3/4 justify-center">
//           <Image src={EmptyChatboxMessageImg} alt="empty chatbot"></Image>
//           <p className="">No Active message</p>
//         </div>
//       )}
//       <div className="overflow-y-scroll no-scrollbar h-3/4 space-y-2">
//         {data && isLoading && (
//           <div className="mx-6">
//             <Skeleton />
//           </div>
//         )}
//         {mappedConversations?.map((item: ChatConversationType, key: any) => {
//           return (
//             <ChatItem
//               id={item.phone_number}
//               handleSelected={() => handleSelected(item)}
//               key={key}
//               number={item?.phone_number}
//               status={
//                 arrayStatus.length > 0 &&
//                 arrayStatus.filter((e) => e.id == item.phone_number).length > 0
//                   ? arrayStatus.filter((e) => e.id == item.phone_number)[0]
//                       .status
//                   : [...item.chat_messages].reverse()[0].chat_status
//               }
//               color={item.color}
//               unread_msg={item.unread_msg}
//               // message={item?.chat_messages
//               //   .slice(-1)[0]
//               //   ?.text?.substring(0, 10)}
//               date={formatDate(
//                 item?.chat_messages.slice(-1)[0]?.date?.toString()
//               )}
//               selectedChatStatus={selectedChatStatus}
//             />
//           );
//         })}
//       </div>
//       {/* </div> */}
//     </div>
//   );
// };

// export default ChatbotLeftSidebar;
