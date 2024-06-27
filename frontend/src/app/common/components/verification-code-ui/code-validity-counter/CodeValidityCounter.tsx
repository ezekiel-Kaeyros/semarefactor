import React from 'react'

type CodeValidityCounterType = {
    message: string; 
    countDown: string;
}

const CodeValidityCounter: React.FC<CodeValidityCounterType> = ({ message, countDown }) => {
  return (
    <div className='text-center'>
        { message } { countDown }
    </div>
  )
}

export default CodeValidityCounter