"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


export const useModal = () => {

    const openModalToggle: boolean = useSelector(
        (state: RootState) => state.ModalReducer.openModalToggle
    );

    const closeModalToggle: boolean = useSelector(
        (state: RootState) => state.ModalReducer.closeModalToggle
    );

    const modalTogle: boolean = useSelector(
        (state: RootState) => state.ModalReducer.modalTogle
    );
  
    const dispatch = useDispatch<AppDispatch>();
  
    return {
        openModalToggle, 
        closeModalToggle, 
        modalTogle, 
        dispatch,
    };
  };