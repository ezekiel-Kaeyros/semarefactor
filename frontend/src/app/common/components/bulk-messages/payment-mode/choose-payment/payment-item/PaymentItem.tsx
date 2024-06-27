import Image from "next/image";

const PaymenItem: React.FC<{ img: any; title: string; id: string; props?: any; name:string, change:any}> = (props) => { 
    return (
      <label
        htmlFor={props.title}
        className="flex items-center w-full my-10 justify-between py-5 px-4 bg-[#2B2E31] mt-7 cursor-pointer rounded-lg"
      >
        <div className="flex items-center">
          <input
            type="radio"
            {...props.props}
            id={props.title}
            value={props.id}
            className="h-6 w-6 border-white border-3 checked:border-white rounded-xl mr-6"
                    name={props.name}
                    onClick={() => {
                        props.change(props.id)
                    }}
          />

          <h1 className="sm:text-xl text-sm font-bold  text-[#FAF9F9]">
            {props.title}
          </h1>
            </div>
            <Image src={props.img} alt="" className="sm:w-auto w-14"/>
            
      </label>
    );
}
export default PaymenItem