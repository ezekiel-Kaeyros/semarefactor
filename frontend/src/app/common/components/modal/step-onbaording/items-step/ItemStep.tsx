import Image from "next/image";

const ItemsStep:React.FC<{img:any,text:string}> = ({img,text}) => {
    return (
        <div className="flex items-center gap-5 my-4">
            <Image src={img} alt="" />
            <span className="text-sm ">{text}</span>

        </div>
    )
};
export default ItemsStep;
