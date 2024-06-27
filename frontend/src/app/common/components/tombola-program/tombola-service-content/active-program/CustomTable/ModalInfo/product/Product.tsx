import React from "react";

import Image from "next/image";
import { initialProducts } from "./data";



export default function Product() {
  
  return (
    <>
    {/* max-h-72 overflow-y-auto */}
    <div className="grid gap-3 ">
    {initialProducts.map((item) =>
        {
            return (
                <>
                    <div className="flex flex-row gap-3 p-[12px] w-full bg-[#2B2E31] rounded-md">
                <Image alt="gucci bag" src={item.imgProduct} className="w-[10%]"/>
                <div className="flex flex-col w-[90%] gap-2">
                  <span className="flex flex-row justify-between ">
                  <span>{item.nameProduct}</span>
                  <span>{item.numberProduct}</span>
                  </span>
                  <p className="text-sm font-thin leading-relaxed font-['Articulat CF']">{item.descriptionProduct}</p>
                </div>
              </div>
                </>
            )
        }
        )}
    </div>
      
    </>
  );
}
