'use client';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PricingPackage from './pricing-package/PricingPackage';
import Image from 'next/image';
import tickImg from '../../../../../../../public/images/Group.svg';

import { useRouter } from 'next/navigation';
import { usePricing } from '@/app/hooks/usePricing';
import { getIdPackage } from '@/redux/features/pricing';
import { Button } from '@/app/common/ui/button/Button';
import Pricing from './pricing/Pricing';
type TypePricing = {
  view: boolean;
  close: any;
};
const tablePackage = [
  {
    title: 'Template Management',
    text1:
      'Create and store message templates for quick and consistent communication.',
    text2: 'Customize templates for different campaigns or purposes.',
  },
  {
    title: 'Two-Way Communication',
    text1: 'Enable recipients to reply directly to messages.',
    text2: 'Facilitate customer engagement and feedback.',
  },
];

const PricingTable = [
  {
    btn: 'Best seller',
    title: 'Premium',
    price: '90,000 ',
    currency: 'XFA',
    period: 'Annually',
    detail: '30% Discount, 120,000 XFA',
    id: '1',
  },
  {
    btn: 'Popular',
    title: 'Starters',
    price: '10,000 ',
    currency: 'XFA',
    period: 'Monthly',
    detail: '5% Discount, 12,000 XFA',
    id: '2',
  },
];

const ChoosePricing: React.FC<TypePricing> = (props) => {
  const { dispatch } = usePricing();
  // const [pricing, setPricing]=useState('')
  const { push } = useRouter();
  // const getIdhandler = (id:string) => {
  //     setPricing(id)
  // }
  const {
    register,
    watch,
    formState: {},
    handleSubmit,
  } = useForm<{ price: string }>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });

  let pricing: string = watch('price');

  const onSubmit: SubmitHandler<{ price: string }> = async (data) => {
    // ;
  };

  return (
    <Modal
      isOpen={props.view}
      onOpenChange={props.close}
      className=" sm:h-[95vh] h-screen lg:w-[69vw] sm:w-[80vw]  w-[100vw]   sm:z-10 z-[5000]"
      size="full"
      radius="lg"
      closeButton={false}
      placement="center"
      classNames={{
        wrapper: 'p-0 overflow-y-auto',
        body: 'py-0 px-0',
        // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        // header: "border-b-[1px] border-[#292f46]",
        // footer: "border-t-[1px] border-[#292f46]",
        closeButton: 'hidden',
      }}
    >
      <ModalContent>
        <>
          <ModalBody className="text-black pb-0 mb-0">
            <div className="w-full grid md:grid-cols-2 grid-cols-1 ">
              <div className="w-full sm:h-[95vh]  h-screen text-white xl:px-10 md:px-4 px-10 py-6 overflow-y-auto no-scrollbar">
                <h1 className="lg:text-[41px] text-xl font-bold my-5">
                  Bulk Message
                </h1>
                <p>
                  A bulk message is a single message sent to a large number of
                  recipients simultaneously, commonly used for marketing,
                  announcements, or communication campaigns. It allows
                  businesses to efficiently reach and engage with a wide
                  audience through various messaging platforms.
                </p>

                <div className="grid lg:grid-cols-2 gap-5 md:my-6 my-4">
                  {tablePackage.map((item, index) => (
                    <PricingPackage
                      key={index}
                      text1={item.text1}
                      text2={item.text2}
                      title={item.title}
                    />
                  ))}
                </div>

                <div className="flex items-center md:mt-7 mt-5">
                  <span>Select your plan</span>
                  <Image src={tickImg} alt="" className="w-7 h-7 ml-2 " />
                </div>

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className=" mt-6 ">
                    {PricingTable.map((item, index) => (
                      <Pricing
                        key={index}
                        btn={item.btn}
                        title={item.title}
                        price={
                          item.price + ' ' + item.currency + ' / ' + item.period
                        }
                        detail={item.detail}
                        id={item.id}
                        // change={getIdhandler}
                        props={{
                          ...register('price', {
                            required: true,
                          }),
                        }}
                        name="price"
                      />
                    ))}
                  </div>

                  <div className="flex justify-end mt-5">
                    <div>
                      {' '}
                      <Button
                        onClick={props.close}
                        className="bg-transparent border-3 border-[#FF385D] mr-2 w-auto"
                      >
                        cancel
                      </Button>
                    </div>
                    <div>
                      {' '}
                      <Button
                        onClick={() => {
                          dispatch(getIdPackage(pricing));
                          push('/en/dashboard');
                        }}
                        variant={!pricing ? 'disabled' : 'mainColor'}
                        disabled={!pricing ? true : false}
                        className="w-auto px-8"
                      >
                        next
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="w-full bg-white h-full rounded-xl md:block hidden"></div>
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ChoosePricing;
