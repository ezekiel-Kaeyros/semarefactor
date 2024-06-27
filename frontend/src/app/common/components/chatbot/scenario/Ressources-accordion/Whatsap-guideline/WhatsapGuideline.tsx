import React from 'react'
import WhatsappGuidelinesImage from '../../../../../../../../public/whatsap/imagery.svg'
import Image from 'next/image'

const WhatsapGuideline = () => { 
  return (
    <div className='flex flex-col gap-2 px-6 py-3 justify-evenly  w-full'>
      <Image alt="" src={WhatsappGuidelinesImage} className='flex items-center '    />
      <h1 className=''>WhatsApp Guidelines </h1>
      <p>Getting specific details on guideline when launching a bulk message</p>
    </div>
  )
}

export default WhatsapGuideline