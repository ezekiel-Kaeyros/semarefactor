import { Button } from '@/app/common/ui/button/Button';

const Pricing: React.FC<{
  btn: string;
  price: string;
  title: string;
  detail: string;
  id?: string;
  props?: any;
  name?: string;
}> = (props) => {
  return (
    <label
      htmlFor={props.id}
      className="flex items-center w-full my-5 justify-between py-2 px-4 bg-[#2B2E31] mt-7 rounded-lg"
    >
      <div>
        <Button
          className={`w-auto ml-0 sm:text-base text-sm`}
          variant={props.id == '2' ? 'outline' : 'mainColor'}
        >
          {props.btn}
        </Button>

        <h1 className="text-xl font-bold mt-2 text-[#FAF9F9]">{props.title}</h1>
        <p className="text-[#FAF9F9]">{props.price}</p>
        <p className="text-sm text-[#CFD4D8]">{props.detail}</p>
      </div>
      <input
        type="radio"
        {...props.props}
        id={props.id}
        value={props.id}
        className="h-6 w-6 border-white border-3 checked:border-white rounded-xl"
        name={props.name}
      />
    </label>
  );
};

export default Pricing;
