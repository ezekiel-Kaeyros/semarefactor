import { getUserCookies, setUserCookies } from '@/cookies/cookies';
import { createSlice } from '@reduxjs/toolkit';

// Just a boiler plate, this file needs to be updated
export type CalendarType = {
  prestation: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    category_id: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  prestationGet: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    category_id: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  date: Date;
  total: number;
  horrour: string;
  categorie: {
    _id: string;
    name: string;
    slug: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }[];
  availableDate: {
    date: string;
    isOpen: boolean;
  }[];
  saveHour: {
    date: string;
    hour: string[];
  }[];
  id_presentation: string[];
};
// type AuthState = {
//   user: {
//     id: string;
//     fullName: string;
//     email: string;
//     token: string;
//     role: any;
//     createdAt: string;
//   };
//   userAuth: UserAuth | undefined;
// };

const initialState: CalendarType = {
  prestation: [],
  date: new Date(
    new Date().getFullYear().toString() +
      '-' +
      (new Date().getMonth() + 1).toString() +
      '-' +
      new Date().getDate().toString()
  ),
  total: 0,
  horrour: '',
  categorie: [],
  prestationGet: [],
  availableDate: [],
  saveHour: [],
  id_presentation: [],
};

export const calendar = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getPresentation: (state, action) => {
      const { name, _id, price } = action.payload;
      const id_array: string[] = [];
      const value = state.prestation.filter((items) => items.name == name);
      if (value.length > 0) {
        const value = state.prestation.filter((items) => {
          if (name != items.name) {
            id_array.push(items._id);

            return items;
          }
        });
        state.id_presentation = id_array;
        state.prestation = [...value];
        state.total = state.total - +price;
      } else {
        const newArray = [...state.prestation, action.payload];
        state.id_presentation = [...state.id_presentation, _id];
        state.total = state.total + +price;
        state.prestation = newArray;
      }
    },
      getDate: (state, action) => {
        console.log(action.payload,'getDate');
        
      state.date = action.payload;
    },
    getHour: (state, action) => {
      state.horrour == action.payload
        ? (state.horrour = '')
        : (state.horrour = action.payload);
    },
    getCategory: (state, action) => {
      state.categorie = action.payload;
    },
    setPrestation: (state, action) => {
      state.prestationGet = action.payload;
    },
    setDateAvailable: (state, action) => {
      state.availableDate = action.payload;
    },
    setSaveDate: (state, action) => {
      const { date } = action.payload;
      const tab = state.saveHour.filter((item) => item.date != date);
      state.saveHour = [...tab, action.payload];
    },
  },
});

export const {
  getPresentation,
  getDate,
  getHour,
  getCategory,
  setPrestation,
  setDateAvailable,
  setSaveDate,
} = calendar.actions;
export default calendar.reducer;
