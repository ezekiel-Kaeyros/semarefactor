import { createSlice } from '@reduxjs/toolkit';
import { PricingTypeI } from './types';

// Just a boiler plate, this file needs to be updated



const initialState: PricingTypeI = {
id:''
};

export const princing = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      getIdPackage: (state, action) => {
          state.id=action.payload
    },
  },
});

export const { getIdPackage } = princing.actions;
export default princing.reducer;
