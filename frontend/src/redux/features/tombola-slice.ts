import { createSlice } from "@reduxjs/toolkit";
import { TombolaServiceTabSilceType, TombolaServiceTabTypeI } from "./types";




const initialState: TombolaServiceTabSilceType = {
    tombolaServiceTabs: [
        {
            id: 1, 
            label: "Active Program", 
            selected: true
        }, 
        {
            id: 2, 
            label: "Program Info", 
            selected: false
        }, 
        {
            id: 3, 
            label: "History", 
            selected: false
        }, 
        {
            id: 4, 
            label: "Create Tombola Program", 
            selected: false
        }, 
    ], 
};


export const tombolaReducer = createSlice({
    name: 'tombolaReducer',
    initialState,
    reducers: {

      changeTab: (state, action) => {

        const { tabData, id } = action.payload;
        const updatedTabData = tabData?.map((tab: TombolaServiceTabTypeI) => {

            if (tab?.id === id) {
              return { ...tab, selected: true }; 
            }; 
            return { ...tab, selected: false }
        }); 

        state.tombolaServiceTabs = updatedTabData;
      }
    },
});

export const { 
    changeTab 
} = tombolaReducer.actions;
export default tombolaReducer.reducer;