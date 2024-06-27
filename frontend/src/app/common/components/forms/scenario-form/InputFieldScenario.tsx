const InputFieldScenario = () => {
   return( <div className="grid grid-cols-[10%,80%,10%] h-[70px] ">
      <div className="h-full w-full border flex justify-center items-center cursor-pointer">
        {}
      </div>
      <div className="h-full w-full">
        <input type="text" className="w-full h-full bg-gray-300"/>
      </div>
       <div className="h-full w-full border flex justify-center items-center cursor-pointer " onClick={() => {
           alert('ok')
      }}>
        x
      </div>
    </div>)
}

export default InputFieldScenario