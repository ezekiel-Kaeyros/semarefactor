import Image from 'next/image';
import tickImg from '../../../../../../../../public/images/tick-circle.svg'

const PricingPackage: React.FC<{
  title: string;
  text1: string;
  text2: string;
}> = (props) => {
  return (
    <div className="px-3 py-2 bg-[#2B2E31] rounded-xl">
      <Image src={tickImg} alt="" className='h-6 w-6' />
      <h2 className="font-bold text-lg my-2">{props.title}</h2>
      <p className="text-sm">{props.text1}</p>
      <p className="text-sm">{props.text2}</p>
    </div>
  );
};

export default PricingPackage