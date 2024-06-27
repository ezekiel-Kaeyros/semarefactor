import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Response } from './qrCodeSlice.d';

interface MyQrProgramState {
  object: Response | null;
}

const initialState: MyQrProgramState = {
  object: null,
};

const myObjectSlice = createSlice({
  name: 'myObject',
  initialState,
  reducers: {
    setObject(state, action: PayloadAction<Response>) {
      state.object = action.payload;
    },
  },
});

export const { setObject } = myObjectSlice.actions;
export default myObjectSlice.reducer;
