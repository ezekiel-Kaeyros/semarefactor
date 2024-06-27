'use client';

import { usePricing } from '@/app/hooks/usePricing';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pricing from '../choose-pricing/pricing/Pricing';
import omLogo from '../../../../../../../public/images/Orange_Money-Logo.wine 2.svg';
import momoLogo from '../../../../../../../public/images/cards-container (1).svg';
import cardLogo from '../../../../../../../public/images/cards-container.svg';
import lockImg from '../../../../../../../public/images/lock.svg';
import PaymenItem from './payment-item/PaymentItem';
import Image from 'next/image';
import tickImg from '../../../../../../../public/images/Group.svg';
import InputFieldPayment from '../../../forms/payment-form/input-field/InputFieldPaymen';
import CardForm from '../../../forms/payment-form/card-form/CardForm';
import { Button } from '@/app/common/ui/button/Button';

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
const MethodPaymenTable = [
  {
    title: 'Orange Money',

    id: '1',
    img: omLogo,
  },
  {
    title: 'Mobile money',

    img: momoLogo,
    id: '2',
  },
  {
    title: 'Card',

    img: cardLogo,
    id: '3',
  },
];

const ChoosePayment = () => {
  const [idPayment, setIdPayment] = useState('');
  const [checked, setchecked] = useState(false);
  const { id } = usePricing();
  const { push } = useRouter();

  const btnHandler = (valid: boolean) => {
    setchecked(valid);
  };
  const idhandler = (id: string) => {
    setIdPayment(id);
  };
  useEffect(() => {
    if (id == '') {
      push('/en/dashboard/bulk-messages');
    }
  }, [id]);
  const pricingChoose = PricingTable.filter((item) => item.id == id);
  let DetailPricing: string[] = ['', ''];

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div>
          <h1 className="text-2xl font-semibold">1.Selected billing </h1>
          {pricingChoose.length > 0 && (
            <Pricing
              title={pricingChoose[0].title}
              price={
                pricingChoose[0].price +
                ' ' +
                pricingChoose[0].currency +
                ' / ' +
                pricingChoose[0].period
              }
              detail={pricingChoose[0].detail}
              id={pricingChoose[0].id}
              btn={pricingChoose[0].btn}
              name="ok"
            />
          )}
          <div>
            <div className="flex items-center">
              {' '}
              <h1 className="text-2xl font-semibold">2.Add payment details </h1>
              <Image src={lockImg} alt="" className="ml-4" />
            </div>

            {MethodPaymenTable.map((item, index) => (
              <PaymenItem
                key={index}
                id={item.id}
                title={item.title}
                img={item.img}
                name={'payment'}
                change={idhandler}
              />
            ))}
            {idPayment == '3' && <CardForm checkHandler={btnHandler} />}
          </div>
        </div>

        <div className="md:w-8/12">
          <h1 className="text-2xl font-semibold">3.Review your purchase</h1>
          <div className="flex justify-between items-center my-5">
            {' '}
            <div className="flex items-center">
              <Image src={tickImg} alt="" className="sm:mr-2" />
              <h1 className="sm:text-lg">
                {pricingChoose.length > 0 && pricingChoose[0].title}
              </h1>
            </div>
            <div>
              <Button
                href="/en/dashboard/bulk-messages"
                className={`w-auto ml-0 sm:text-base text-sm`}
                variant={'mainColor'}
              >
                Change plan
              </Button>
            </div>
          </div>
          {pricingChoose.length > 0 && (
            <div className="w-full px-3 bg-[#2B2E31] py-4">
              <div className="flex justify-between font-bold text-lg text-[#FAF9F9]">
                <span>Total</span>

                <span>{pricingChoose[0].price}</span>
              </div>
              <div className="flex justify-between font-semibold my-5 text-[#FAF9F9]">
                <span>Billing cycle</span>
                <span>{pricingChoose[0].period}</span>
              </div>
              <p className="text-[#CFD4D8] ">
                Subscription will automatically renew 100,000 XFA plus any
                applicable tax every year, starting Jan 28, 2024 unless you
                cancel before the day of your next renewal in your subscription
                settings
              </p>
            </div>
          )}
          <Button
            className={`rounded-none mt-2`}
            variant={!checked ? 'disabled' : 'mainColor'}
            disabled={!checked ? true : false}
          >
            Buy subcription
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChoosePayment;
