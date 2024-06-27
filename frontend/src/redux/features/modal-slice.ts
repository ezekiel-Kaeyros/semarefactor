import { createSlice } from '@reduxjs/toolkit';
import { ModalSliceType } from './types';
import { Props, ParentLabel } from './modal-slice.d';

const initialState: ModalSliceType = {
  openModalToggle: false,
  closeModalToggle: false,
  modalTogle: false,
  interactive_labels: [],
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    toggleOpenModal: (state, action) => {
      state.modalTogle = action.payload;
    },
    toggleCloseModal: (state, action) => {
      state.modalTogle = action.payload;
    },

    selectDetailValue: (state, action) => {
      const { id } = action.payload;
      const updatedScenarioData: ParentLabel[] = state?.interactive_labels.map(
        (child: ParentLabel) => {
          if (child.uuid === id) {
            return { ...child, status: true };
          }
          return { ...child, status: false };
        }
      );
      state.interactive_labels = updatedScenarioData;
    },
  },
});

export const { toggleOpenModal, toggleCloseModal, selectDetailValue } =
  modalSlice.actions;
export default modalSlice.reducer;
