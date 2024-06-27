"use client"
import { TombolaServiceTabTypeI } from "@/redux/features/types";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


export const useTombolaService = () => {

    const tombolaServiceTabs: TombolaServiceTabTypeI[] = useSelector(
        (state: RootState) => state.TombolaServiceSlice.tombolaServiceTabs!
    );
  
    const dispatch = useDispatch<AppDispatch>();
  
    return {
        tombolaServiceTabs, 
        dispatch,
    };
};