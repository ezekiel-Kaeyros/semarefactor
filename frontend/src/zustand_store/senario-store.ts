import { create } from 'zustand';
import { SenarioType } from './types';

export const useSenarioCreate = create<SenarioType>((set) => ({
  title: '',
  type: '',
  credential_id: '',
  active: false,
  scenario_items: [],
  _id: '',
  nameSenario: '',
  nodesData: [],
  edgesData: [],
  keywords: [],
  setInitialistionSenario: (nds) =>
    set((state) => ({
      ...state,
      title: nds.title,
      type: nds.type,
      _id: nds._id,
      active: nds.active,
      credential_id: nds.credential_id,
      keywords: nds.keywords,
      nameSenario: nds.title,
    })),
  setAddNodesData: (nds) =>
    set((state) => ({ ...state, nodesData: [...state.nodesData, nds] })),
  setScenarioItems: (nds) =>
    set((state) => {
      let excluNewItems = state.scenario_items.filter(
        (item) => !nds.some((nd) => nd.id === item.id)
      );
      return { ...state, scenario_items: excluNewItems.concat(nds) };
    }),
  deleteScenarioItem: (id) =>
    set((state) => {
      let excluNewItems = state.scenario_items.filter((item) => item.id !== id);
      return { ...state, scenario_items: excluNewItems };
    }),
  setNodesData: (nds) => set((state) => ({ ...state, nodesData: nds })),
  setNameSenario: (nameSena) => set((state) => ({ ...state, title: nameSena })),
  setKeywordsSenario: (keysSena) =>
    set((state) => ({ ...state, keywords: keysSena })),
  reset: () =>
    set((state) => ({
      ...state,
      title: '',
      type: '',
      credential_id: '',
      active: false,
      scenario_items: [],
      _id: '',
      nameSenario: '',
      nodesData: [],
      edgesData: [],
      keywords: [],
    })),
}));
