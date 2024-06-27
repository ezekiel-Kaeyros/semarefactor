'use client';
import {
  BulkMessageTabTypeI,
  TypeItemTableSaveTemplete,
} from '@/redux/features/types';
import { AppDispatch, RootState } from '@/redux/store';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useBolkMessage = () => {
  const bulkMessageTabs: BulkMessageTabTypeI[] = useSelector(
    (state: RootState) => state.BulkMessageSlice.bulkMessageTabs!
  );

  const savedTemplateToggle: boolean = useSelector(
    (state: RootState) => state.BulkMessageSlice.savedTemplateToggle
  );

  const historyToggle: boolean = useSelector(
    (state: RootState) => state.BulkMessageSlice.historyToggle
  );

  const sendMessageToggle: boolean = useSelector(
    (state: RootState) => state.BulkMessageSlice.sendMessageToggle
  );

 

  const itemTableTemplete: TypeItemTableSaveTemplete = useSelector(
    (state: RootState) => state.BulkMessageSlice.itemTableTemplete
  );
 const isRefresh: boolean = useSelector(
   (state: RootState) => state.BulkMessageSlice.isRefresh
 );
  const TableTemplete: TypeItemTableSaveTemplete[] = useSelector(
    (state: RootState) => state.BulkMessageSlice.tableTemplete
  );
 const tab1:string=useSelector((state:RootState)=>state.BulkMessageSlice.isActive)


  const dispatch = useDispatch<AppDispatch>();

  return {
    bulkMessageTabs,
    sendMessageToggle,
    savedTemplateToggle,
    historyToggle,
    dispatch,
 isRefresh,
    itemTableTemplete,
    TableTemplete,
    tab1
  };
};
