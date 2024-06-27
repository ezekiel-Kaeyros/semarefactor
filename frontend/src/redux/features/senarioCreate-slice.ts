import { createSlice } from '@reduxjs/toolkit';
import { SenarioType } from './types';

const initialState: SenarioType = {
  nodesData: [],
  edgesData: [],
};

export const senarioCreateSlice = createSlice({
  name: 'senariocreate',
  initialState,
  reducers: {
    setNodesData: (state, action) => {
      state.nodesData = action.payload;
    },
    setAddNodesData: (state, action) => {
      state.nodesData = [...state.nodesData, action.payload];
    },
  },
});

export const { setNodesData } = senarioCreateSlice.actions;
export default senarioCreateSlice.reducer;
