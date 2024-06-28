'use client'
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useCalender = () => {
  const arrayPresentation: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    category_id: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
  }[] = useSelector((state: RootState) => state.CalendarReducer.prestation);
  const total: number = useSelector(
    (state: RootState) => state.CalendarReducer.total
  );
    
      const arrayGetPresentation: {
        _id: string;
        name: string;
        price: number;
        duration: number;
        category_id: string;
        company_id: string;
        createdAt: string;
        updatedAt: string;
      }[] = useSelector((state: RootState) => state.CalendarReducer.prestationGet);
     
     const arrayCat: {
       _id: string;
       name: string;
       slug: string;
       company_id: string;
       createdAt: string;
       updatedAt: string;
       __v: 0;
     }[] = useSelector((state: RootState) => state.CalendarReducer.categorie);
   
     const arraySaveDate: {
       date: string;
       hour: string[];
     
    
     }[] = useSelector((state: RootState) => state.CalendarReducer.saveHour);
    
      const dateGet: Date = useSelector(
        (state: RootState) => state.CalendarReducer.date
      );
    const heure:string=useSelector((state:RootState)=>state.CalendarReducer.horrour)
    const id_array: string[] = useSelector(
      (state: RootState) => state.CalendarReducer.id_presentation
    );
    const dispatch = useDispatch<AppDispatch>();
    const availableDat:{date:string,isOpen:boolean}[]=useSelector((state:RootState)=>state.CalendarReducer.availableDate)
    
    return { arrayPresentation, total, dispatch , dateGet, heure,arrayCat,arrayGetPresentation,availableDat,arraySaveDate,id_array};
};


