import { create } from 'zustand';
import { LoaderDataType, SenarioType } from './types';

export const useLoaderData = create<LoaderDataType>((set) => ({
  isLoading: false,
  setIsLoading: (load) => set((state) => ({ ...state, isLoading: load })),
}));
