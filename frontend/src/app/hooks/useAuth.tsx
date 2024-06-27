import { UserAuth } from '@/redux/features/auth-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const user: UserAuth | undefined = useSelector(
    (state: RootState) => state?.AuthReducer.userAuth
  );

  const dispatch = useDispatch<AppDispatch>();

  return {
    user,
    dispatch,
  };
};
