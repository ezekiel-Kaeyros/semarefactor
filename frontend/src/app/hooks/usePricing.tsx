'use client';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const usePricing = () => {
  const id: string = useSelector(
    (state: RootState) => state.PricingReducer.id
  );



  const dispatch = useDispatch<AppDispatch>();

  return {
   id,
    dispatch
  };
};
