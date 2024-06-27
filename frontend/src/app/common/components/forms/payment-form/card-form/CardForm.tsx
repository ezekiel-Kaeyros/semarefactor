import InputFieldPayment from '../input-field/InputFieldPaymen';
import { SubmitHandler, useForm } from 'react-hook-form';
import cardImg from '../../../../../../../public/images/card.svg';
import tickImg from '../../../../../../../public/images/tick-circle (1).svg';
import { useEffect, useState } from 'react';
import { log } from 'loglevel';
const TableCardFomInput1 = [
  { title: 'First Name', name: 'firstname' },
  { title: 'Last ame', name: 'lastname' },
  { title: 'Card number', name: 'card', img: cardImg },
];
const TableCardFomInput2 = [
  { title: 'Expiration month', name: 'expirationMonth', img: tickImg },
  { title: 'Expiration Year', name: 'expirationYaer', img: tickImg },
  { title: 'CVV', name: 'cvv', img: tickImg },
];

const TableCardFomInput3 = [
  { title: 'Billing  Country', name: 'country', img: '' },
];

type FormCardPaymentTypeI = {
  firstname: string;
  lastname: string;
  cvv: string;
  expirationMonth: string;
  expirationYaer: string;
  card: string;
  country: string;
  name?: string;
  street?: string;
  company?: string;
  city?: string;
};

const CardForm: React.FC<{ checkHandler: any }> = (props) => {
  const [view, setView] = useState(false);
  const [checkCardNumber, setCheckCardNumber] = useState<boolean | string>();
  const [checkExpirationCard, setCheckExpirationCard] = useState({
    mont: false,
    year: false,
    expiration: false,
  });
  const {
    register,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormCardPaymentTypeI>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });
  var expirationMonth = watch('expirationMonth');
  var expirationYaer = watch('expirationYaer');
  var cardNumber = watch('card');
  const date = new Date();

  //  num_jour = date.getDay();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const valid_credit_card = (value: string) => {
    let numberToCheck = 0,
      isMultiplicate = false;

    for (var n = value.length - 1; n >= 0; n--) {
      var elementOfListNumber = value.charAt(n),
        numberToCalculate = parseInt(elementOfListNumber, 10);

      if (isMultiplicate && (numberToCalculate *= 2) > 9)
        numberToCalculate -= 9;

      numberToCheck += numberToCalculate;
      isMultiplicate = !isMultiplicate;
    }
    if (numberToCheck % 10 == 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (cardNumber && cardNumber.length > 0) {
      setCheckCardNumber(valid_credit_card(cardNumber));
    }

    if (
      expirationYaer &&
      expirationYaer.length > 0 &&
      +expirationYaer > currentYear
    ) {
      setCheckExpirationCard({ mont: false, year: false, expiration: true });
    } else if (
      expirationYaer &&
      expirationYaer.length > 0 &&
      +expirationYaer == currentYear
    ) {
      if (
        expirationMonth &&
        expirationMonth.length > 0 &&
        +expirationMonth < currentMonth + 1
      ) {
        setCheckExpirationCard({ mont: true, year: false, expiration: false });
      } else {
        setCheckExpirationCard({ mont: false, year: false, expiration: true });
      }
    } else if (
      expirationYaer &&
      expirationYaer.length > 0 &&
      +expirationYaer < currentYear
    ) {
      setCheckExpirationCard({ mont: false, year: true, expiration: false });
    }
    if (isValid && checkCardNumber == true) {
      props.checkHandler(checkExpirationCard.expiration);
    } else {
      props.checkHandler(false);
    }
    // props.checkHandler(isValid);
  }, [
    isValid,
    view,
    expirationYaer,
    expirationMonth,
    cardNumber,
    checkCardNumber,
  ]);

  const onSubmit: SubmitHandler<FormCardPaymentTypeI> = async (data) => {};
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="my-3 h-[76px]">
          <InputFieldPayment
            name="firstName"
            id="firstName"
            type="text"
            title="First Name"
            placeholder="content"
            props={{
              ...register('firstname', {
                required: true,
              }),
            }}
          />
        </div>
        <div className="my-3 h-[76px]">
          {' '}
          <InputFieldPayment
            name="lastname"
            id="lastname"
            type="text"
            title="Last Name"
            placeholder="content"
            props={{
              ...register('lastname', {
                required: true,
              }),
            }}
          />
        </div>

        <div
          className={`my-3 min-h-[76px] ${
            (errors.card && cardNumber && cardNumber.length > 0) ||
            (cardNumber && cardNumber.length > 0 && !checkCardNumber)
              ? 'mb-3'
              : ''
          } `}
        >
          {' '}
          <InputFieldPayment
            name="card"
            id="card"
            type="text"
            title="Card number"
            placeholder="content"
            props={{
              ...register('card', {
                required: true,
                pattern: /[0-9]{9,16}$/,
                //   minLength: 9,
                //  maxLength:16
              }),
            }}
            img={cardImg}
            isValid={
              (errors.card && cardNumber && cardNumber.length > 0) ||
              (cardNumber && cardNumber.length > 0 && !checkCardNumber)
                ? true
                : false
            }
          />
          {!errors.card &&
            cardNumber &&
            cardNumber.length > 0 &&
            !checkCardNumber && (
              <p className="text-red-500 text-xs mt-1">invalid card</p>
            )}
          {errors.card && cardNumber && cardNumber.length > 0 && (
            <p className="text-red-500 text-xs mt-1">
              number card must be have a length between 9 and 16 characters with
              only the number
            </p>
          )}
        </div>

        <div
          className={`grid lg:grid-cols-3 grid-cols-1 lg:gap-5  ${errors.expirationMonth || errors.expirationYaer || errors.cvv || checkExpirationCard.mont || checkExpirationCard.year ? 'lg:mb-10 gap-3' : 'lg:mb-0'}`}
        >
          <div
            className={`my-3 lg:h-24 h-[76px] ${errors.expirationMonth || checkExpirationCard.mont ? '' : 'border-none'}`}
          >
            {' '}
            <InputFieldPayment
              name="expirationMonth"
              id="expirationMonth"
              type="text"
              title="Expiration month"
              placeholder="content"
              props={{
                ...register('expirationMonth', {
                  required: true,
                  pattern: /(^0[1-9]{1}$)|(^1[0-2]{1}$)/,
                }),
              }}
              img={tickImg}
              isValid={
                (errors.expirationMonth &&
                  expirationMonth &&
                  expirationMonth.length > 0) ||
                checkExpirationCard.mont
                  ? true
                  : false
              }
            />
            {errors.expirationMonth &&
              expirationMonth &&
              expirationMonth.length > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  month must have a length of 2 with the format 0x or 1x
                </p>
              )}
            {!errors.expirationMonth && checkExpirationCard.mont && (
              <p className="text-red-500 text-xs mt-1">this card is expired</p>
            )}
          </div>
          <div
            className={`my-3 lg:h-24 h-[76px] ${errors.expirationYaer ? '' : 'border-none'}`}
          >
            <InputFieldPayment
              name="expirationYaer"
              id="expirationYaer"
              type="text"
              title="Expiration Year"
              placeholder="content"
              props={{
                ...register('expirationYaer', {
                  required: true,
                  pattern: /^(1|2)[0-9]{3}$/,
                }),
              }}
              img={tickImg}
              isValid={
                (errors.expirationYaer &&
                  expirationYaer &&
                  expirationYaer.length > 0) ||
                checkExpirationCard.year
                  ? true
                  : false
              }
            />
            {errors.expirationYaer &&
              expirationYaer &&
              expirationYaer.length > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  year must have a length of 4 with the format 1xxx or 2xxx
                </p>
              )}
            {!errors.expirationYaer && checkExpirationCard.year && (
              <p className="text-red-500 text-xs mt-1">this card is expired</p>
            )}
          </div>
          <div className="my-3 lg:h-24 h-[76px]">
            {' '}
            <InputFieldPayment
              name="cvv"
              id="cvv"
              type="text"
              title="CVV"
              placeholder="content"
              props={{
                ...register('cvv', {
                  required: true,
                }),
              }}
              img={tickImg}
            />
          </div>
        </div>

        <div className="my-3 h-[76px]">
          <InputFieldPayment
            name="country"
            id="country"
            type="text"
            title="Billing  Country'"
            placeholder="content"
            props={{
              ...register('country', {
                required: true,
              }),
            }}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            value="ok"
            id="check"
            className="h-6 w-6 mr-2 my-3"
            onClick={() => {
              setView((view) => !view);
            }}
          />
          <label htmlFor="check">
            Add billing address (visible on invoice)
          </label>
        </div>

        {view && (
          <>
            <div className="my-3 h-[76px]">
              <InputFieldPayment
                name="Name"
                id="Name"
                type="text"
                title="Full Name(optional)"
                placeholder="content"
                props={{
                  ...register('name', {}),
                }}
              />
            </div>
            <div className="my-3 h-[76px]">
              {' '}
              <InputFieldPayment
                name="company"
                id="company"
                type="text"
                title="Company(optional)"
                placeholder="content"
                props={{
                  ...register('company', {}),
                }}
              />
            </div>

            <div className="my-3 h-[76px]">
              {' '}
              <InputFieldPayment
                name="street"
                id="street"
                type="text"
                title="Street Address(optional)"
                placeholder="content"
                props={{
                  ...register('street', {}),
                }}
              />
            </div>
            <div className="my-3 h-[76px]">
              {' '}
              <InputFieldPayment
                name="city"
                id="city"
                type="text"
                title="City(optional)"
                placeholder="content"
                props={{
                  ...register('city', {}),
                }}
              />
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default CardForm;
