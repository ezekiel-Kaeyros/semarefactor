import { create } from 'zustand';
import { SenarioType } from './types';

export const useSenarioCreate = create<SenarioType>((set) => ({
  nameSenario: '',
  nodesData: [],
  edgesData: [],
  keywords: [],
  setAddNodesData: (nds) =>
    set((state) => ({ ...state, nodesData: [...state.nodesData, nds] })),
  setNodesData: (nds) => set((state) => ({ ...state, nodesData: nds })),
  setNameSenario: (nameSena) =>
    set((state) => ({ ...state, nameSenario: nameSena })),
  setKeywordsSenario: (keysSena) =>
    set((state) => ({ ...state, keywords: keysSena })),
  reset: () =>
    set((state) => ({
      ...state,
      nodesData: [],
      edgesData: [],
      nameSenario: '',
      keywords: [],
    })),
}));
