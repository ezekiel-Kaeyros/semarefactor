import { create } from 'zustand';
import { NomberConversationDataType } from './types';

export const useNumberConversationsData = create<NomberConversationDataType>(
  (set) => ({
    nb: 0,
    setNb: (newNb) => set((state) => ({ ...state, nb: newNb })),
  })
);
