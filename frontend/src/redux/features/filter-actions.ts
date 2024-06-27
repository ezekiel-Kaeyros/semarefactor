import { FilterActionsProps } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { scenarios } from '@/app/common/components/chatbot-components/chatbot-left-sidebar/chat-header/scenario-filter/filter-options/FilterOptions';

interface FilterScenarioState {
  scenarios: FilterActionsProps | any;
}

const initialState: FilterScenarioState = {
  scenarios: scenarios,
};

const filterObjectSlice = createSlice({
  name: 'filterObject',
  initialState,
  reducers: {
    setScenarioObject(state, action: PayloadAction<FilterActionsProps>) {
      state.scenarios = action.payload;
    },
  },
});

export const { setScenarioObject } = filterObjectSlice.actions;
export default filterObjectSlice.reducer;
