import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useDisplayChatUiToggle = () => {
  const displayChatUiToggle: any = useSelector(
    (state: RootState) => state?.ChatBotSlice?.displayChatUiToggle
  );

  const dispatch = useDispatch<AppDispatch>();

  return {
    displayChatUiToggle,
    dispatch,
  };
};
