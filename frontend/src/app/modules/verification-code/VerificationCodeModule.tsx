'use client';
import { Button } from '@/app/common/ui/button/Button';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import CodeValidityCounter from '@/app/common/components/verification-code-ui/code-validity-counter/CodeValidityCounter';
import VerificationHeaderUI from '@/app/common/components/verification-code-ui/verification-header-ui/VerificationHeaderUI';
import { Spinner } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { VerificationCodeModuleType } from './verificationCodeModule.d';
import { useRouter } from 'next/navigation';
import { formatTime } from '@/redux/utils';
// import { formatTime } from '@/redux/utils';

type SignInType = {
  email: string;
  contact: number;
  password: string;
  confirmPassword: string;
};

const VerificationCodeModule = () => {
  const router = useRouter();
  const [time, setTime] = useState(60);

  // useEffect(() => {
  //   if (time > 0) {
  //     const countdownInterval = setInterval(() => {
  //       setTime((prevTime) => {
  //         if (prevTime === 0) {
  //           clearInterval(countdownInterval);
  //           return prevTime;
  //         }
  //         return prevTime - 1;
  //       });
  //     }, 1000);
  //     return () => clearInterval(countdownInterval);
  //   } else {
  //     reset();
  //   }
  // }, [time]);

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    if (value.length === 1) {
      switch (index) {
        case 0:
          inputRef2?.current?.focus();
          break;
        case 1:
          inputRef3.current?.focus();
          break;
        case 2:
          inputRef4.current?.focus();
          break;
        default:
          break;
      }
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<VerificationCodeModuleType>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });

  const onSubmit: SubmitHandler<VerificationCodeModuleType> = (data) => {
    // ;
  };

  return (
    <div className="w-full h-screen  flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VerificationHeaderUI />
        <div className="flex flex-row gap-3 justify-center my-[1rem]">
          <div className="mb-[-1rem] w-[71px]">
            <div>
              <InputField
                register={register('digit1', {
                  required: 'This is required',
                  minLength: {
                    value: 1,
                    message: 'At least 1 character',
                  },
                  maxLength: {
                    value: 1,
                    message: 'At most 1 character',
                  },
                  onChange(event) {
                    handleInputChange(event, 0);
                  },
                })}
                // icon={ShopIcon}
                style={`rounded-2xl bg-inputBg2 border ${
                  errors?.digit1 !== undefined &&
                  getValues('digit1') !== undefined
                    ? 'border-red-600 focus:border-red-600'
                    : 'border-mainColor'
                } py-[20px] pl-[30px] w-[20px]`}
                // border-gray-300
                name="digit1"
                placeholder="-"
                reference={inputRef1}
                func={handleInputChange}
                numberI={0}
              />
            </div>
            {/* <p className="mt-1 text-sm text-red-400">
                            {errors?.digit1 && <>A minimum of 3 characters is required</>}
                        </p> */}
          </div>
          <div className="mb-[-1rem] w-[71px]">
            <div>
              <InputField
                register={register('digit2', {
                  required: true,
                  minLength: 1,
                  maxLength: 1,
                  disabled: getValues('digit1') ? false : true,
                  validate: (value: any): any => {
                    if (!getValues('digit1')) {
                      return 'Previous field is not filled';
                    }
                  },
                  onChange(event) {
                    handleInputChange(event, 1);
                  },
                })}
                // icon={ShopIcon}
                style={`rounded-2xl bg-inputBg2 border ${
                  errors?.digit2 !== undefined &&
                  getValues('digit2') !== undefined
                    ? 'border-red-600 focus:border-red-600'
                    : 'border-mainColor'
                } py-[20px] pl-[30px] w-[20px]`}
                // border-gray-300
                name="digit2"
                placeholder="-"
                reference={inputRef2}
                // func={ handleInputChange }
                // numberI={ 1 }
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.digit2 && <>{errors?.digit2?.message}</>}
            </p>
          </div>
          <div className="mb-[-1rem] w-[71px]">
            <div>
              <InputField
                register={register('digit3', {
                  required: true,
                  minLength: 1,
                  maxLength: 1,
                  disabled: getValues('digit2') ? false : true,
                  validate: (value: any): any => {
                    if (!getValues('digit2')) {
                      return 'Previous field is not filled';
                    }
                  },
                  onChange(event) {
                    handleInputChange(event, 2);
                  },
                })}
                // icon={ShopIcon}
                style={`rounded-2xl bg-inputBg2 border ${
                  errors?.digit3 !== undefined &&
                  getValues('digit3') !== undefined
                    ? 'border-red-600 focus:border-red-600'
                    : 'border-mainColor'
                } py-[20px] pl-[30px] w-[20px]`}
                // border-gray-300
                name="digit3"
                placeholder="-"
                reference={inputRef3}
                func={handleInputChange}
                numberI={2}
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.digit3 && <>{errors?.digit3?.message}</>}
            </p>
          </div>
          <div className="mb-[-1rem] w-[71px]">
            <div>
              <InputField
                register={register('digit4', {
                  required: true,
                  minLength: 1,
                  maxLength: 1,
                  disabled: getValues('digit3') ? false : true,
                  validate: (value: any): any => {
                    if (!getValues('digit3')) {
                      return 'Previous field is not filled';
                    }
                  },
                  onChange(event) {
                    handleInputChange(event, 3);
                  },
                })}
                // icon={ShopIcon}
                style={`rounded-2xl bg-inputBg2 border ${
                  errors?.digit4 !== undefined &&
                  getValues('digit4') !== undefined
                    ? 'border-red-600 focus:border-red-600'
                    : 'border-mainColor'
                } py-[20px] pl-[30px] w-[20px]`}
                // border-gray-300
                name="digit4"
                placeholder="-"
                reference={inputRef4}
                func={handleInputChange}
                numberI={3}
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.digit4 && <>{errors?.digit4?.message}</>}
            </p>
          </div>
        </div>

        {time > 0 ? (
          <>
            <Button
              disabled={isSubmitting || getValues('digit4') ? false : true}
              variant={
                isSubmitting || getValues('digit4') ? 'mainColor' : 'mainColor'
              }
              // icon={ sendIconIcon }
              rightIcon={true}
              iconSize={30}
              className={`py-4 ${
                getValues('digit4') ? 'opacity-100' : 'opacity-35'
              }`}
            >
              {isSubmitting ? (
                <Spinner size="sm" color="white" />
              ) : (
                <>Proceed</>
              )}
            </Button>
            <CodeValidityCounter
              message="Resend code in"
              countDown={formatTime(time)}
            />
          </>
        ) : (
          <div className="w-full my-8">
            <Button
              // disabled={ isSubmitting }
              variant={isSubmitting ? 'disabled' : 'mainColor'}
              // href='/'
              className="w-full py-4"
            >
              {isSubmitting ? (
                <Spinner size="sm" color="white" />
              ) : (
                <>Send Code Again</>
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default VerificationCodeModule;
