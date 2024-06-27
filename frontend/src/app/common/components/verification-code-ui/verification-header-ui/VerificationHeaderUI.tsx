import Image from 'next/image'
import React from 'react'

import logo from "../../../../../../public/phoneCallVerification.png"

const VerificationHeaderUI = () => {
  return (
    <div className=' flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center bg-mainColor rounded-lg w-[50px] mb-[1rem]'>
        <Image src={logo} alt='log' width={ 50 } />
      </div>
      <div >
        <h1 className='text-[2rem] text-center' style={{
          fontFamily: "visby-bold"
        }}>Verification Code</h1>
        <p className='text-center'>Enter the code from the number we just sent you</p>
      </div>
    </div>
  )
}

export default VerificationHeaderUI