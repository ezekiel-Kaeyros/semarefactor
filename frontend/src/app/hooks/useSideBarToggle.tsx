// import { PointOfSaleViewState } from '@/redux/features/create-point-of-sale-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useSideBarToggle = () => {
  const sideBarToggle: any = useSelector(
    (state: RootState) => state?.ChatBotSlice.sideBarToggle
  );

  const dispatch = useDispatch<AppDispatch>();

  return {
    sideBarToggle,
    dispatch,
  };
};
