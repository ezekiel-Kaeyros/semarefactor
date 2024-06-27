// import { BulkMessageTabType } from "@/app/common/components/bulk-messages/bulk-message-tabs/bulk-message-tab/bulkMessageTab";
import { createSlice } from "@reduxjs/toolkit";
import {
  BulkMessageTabSilceType,
  BulkMessageTabTypeI,
  TypeItemTableSaveTemplete,
} from './types';



const initialState: BulkMessageTabSilceType = {
  sendMessageToggle: true,
  savedTemplateToggle: false,
  historyToggle: false,
  bulkMessageTabs: [
    {
      id: 1,
      label: 'Send Message',
      selected: true,
    },
    {
      id: 2,
      label: 'History ',
      selected: false,
    },
    {
      id: 3,
      label: 'Templates',
      selected: false,
    },
  ],

  itemTableTemplete: {} as TypeItemTableSaveTemplete,
  tableTemplete: [],
  isRefresh: false,
  isActive:'4'
};

export const bulkMessageReducer = createSlice({
  name: 'bulkMessageReducer',
  initialState,
  reducers: {
    toggleSendMessageToggle: (state, action) => {
      state.sendMessageToggle = action.payload;
    },
    toggleSavedTemplateToggle: (state, action) => {
      state.savedTemplateToggle = action.payload;
    },
    toggleHistory: (state, action) => {
      state.historyToggle = action.payload;
    },
    changeTab: (state, action) => {
      const { tabData, id } = action.payload;
      const updatedTabData = tabData?.map((tab: BulkMessageTabTypeI) => {
        if (tab?.id === id) {
            localStorage.setItem('activeTab', id);

            return { ...tab, selected: true };
        
        }
        return { ...tab, selected: false };
      });

      state.bulkMessageTabs = updatedTabData;
    },
    toggleToFilled: (state, action) => {
      state.historyToggle = action.payload;
    },

    fillTableTemplete: (state, action) => {
      state.tableTemplete = action.payload;
    },
    addItemTableTemplete: (state, action) => {
      state.tableTemplete.push(action.payload);
    },
    getItemTableTemplete: (state, action) => {
      state.itemTableTemplete = action.payload;
    },
    refesh: (state, action) => {
      state.isRefresh=action.payload
    },

    setTab: (state, action) => {
      console.log(action.payload,'++++++++++++++++++');
      
      state.isActive = action.payload
            localStorage.setItem('activeTab', action.payload);
      
    }
   
  },
});
  
export const {
  toggleSendMessageToggle,
  toggleSavedTemplateToggle,
  toggleHistory,
  changeTab,
  refesh,
  setTab,
 
  addItemTableTemplete,
} = bulkMessageReducer.actions;
  export default bulkMessageReducer.reducer;