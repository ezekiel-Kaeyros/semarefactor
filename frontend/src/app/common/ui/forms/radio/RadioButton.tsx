import Link from 'next/link'
import React from 'react'

type RadioButtonType = { 
    register: any;
    name: string
    linkLabel1: string;
    linkLabel2: string;
    title: string;
    link1?: any; 
    link2?: any; 
    width?: string;
    height?: string;
}

const RadioButton: React.FC<RadioButtonType> = ({ 
    register, 
    name, 
    linkLabel1,
    linkLabel2,
    title,
    link1,
    link2,
    width,
    height, }) => {
  return (
    <div className='flex flex-row gap-[1rem] items-center'>
        <div>
            <input 
                className={`cursor-pointer ${ width ? width : "w-[35px]" } ${ height ? height : "h-[35px]"}`} 
                type='radio' 
                style={{ border: "10px solid gray", verticalAlign: "middle"}} 
                name={ name } 
                {...register}
            />
        </div>
        <div>
            <span>{ title }</span>
            <div> <Link style={{
              fontFamily: "visby-bold"
            }} href={link1} className='text-mainColor'>{ linkLabel1 }</Link> and <Link style={{
                fontFamily: "visby-bold"
              }} href={link2} className='text-mainColor'>{ linkLabel2 }</Link>.</div>
        </div>
    </div>
  )
}

export default RadioButton