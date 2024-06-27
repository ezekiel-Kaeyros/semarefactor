'use client';
import { Button } from '@/app/common/ui/button/Button';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import logo from '../../../../public/images/sema-logo-2.svg';
import vector from '../../../../public/images/Vector-background.svg';
import close from '../../../../public/icons/close.svg';
import arrowIcon from '../../../../public/icons/chatbot/arrow-left.svg';
import RadioButton from '@/app/common/ui/forms/radio/RadioButton';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

type SignUpType = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeCondition: boolean;
  company: string;
};
import OnboardingModal from '@/app/common/components/modal/OnboardingModal';
import { setEmailCookies } from '@/cookies/cookies';
interface SingUpType {
  step: boolean;
}
const SignUpModule = (props: SingUpType) => {
  const [isLoading, setIsLoading] = useState<boolean>(props.step);
  const [step, setStep] = useState<boolean>(false);
  const pathName = usePathname();
  const { push } = useRouter();
  const urlSplit = pathName.split('/');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<SignUpType>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });
  let company = watch('company');
  let phone = watch('phone');
  let email = watch('email');
  let password = watch('password');

  const onSubmit: SubmitHandler<SignUpType> = (data) => {
    try {
      setIsLoading(true);
      const response = new AuthService()
        .register({ email, phone, password, company })
        .then((result) => {
          if (result.status == 200) {
            setIsLoading(false);
            setEmailCookies({ email: email });
            push(`/${urlSplit[1]}/login`);
          }
        })
        .catch((errors) => {
          alert('errors?.message');

          // alert(errors?.message)
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative px-3 h-screen overflow-y-scroll flex justify-center pb-10  ">
      {!step ? (
        <Link href={'/'}>
          <Image
            src={close}
            className=" absolute top-10 left-10  cursor-pointer"
            alt={'close'}
          />
        </Link>
      ) : (
        ''
      )}
      <Toaster position="top-center" reverseOrder={false} />

      <form
        className={`w-[400px]  flex-col py-5 z-20 ${!step ? 'flex' : 'hidden'} `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center items-center mb-1">
          <Image src={logo} alt="log" className=" w-36" />
        </div>
        <div
          style={{
            fontFamily: 'visby-bold',
          }}
          className="w-full flex flex-col text-center mb-[2rem]"
        >
          <h1 className="text-[2.5rem] font-bold">Sign Up</h1>
          <p className=" text-grayText font-[visby-medium]">Get Started</p>
        </div>

        <div className="flex flex-col gap-[1.5rem]">
          <div>
            <div>
              <InputField
                register={register('company', {
                  required: true,
                  minLength: 3,
                })}
                // icon={ShopIcon}
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                name="company"
                placeholder="Shop Name"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.email && <>A minimum of 3 characters is required</>}
            </p>
          </div>
          <div>
            <div>
              <InputField
                register={register('email', {
                  required: true,
                  minLength: 3,
                  pattern: /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/,
                })}
                // icon={ShopIcon}
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                name="email"
                placeholder="Your email"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.email && <>the format of this email is not valid</>}
            </p>
          </div>

          <div>
            <div>
              <InputField
                // icon={ContactIcon}
                name="contact"
                type="text"
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                register={register('phone', {
                  required: true,
                  pattern: /^(237)6(9|7|6|5|2|8)[0-9]{7}$/,
                })}
                placeholder="(+237)Phone Number"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.phone && <>contact is not valid</>}
            </p>
          </div>

          <div>
            <div>
              <InputField
                // icon={UserIcon}
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                register={register('password', {
                  required: true,
                  minLength: 6,
                })}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="mt-1 text-sm text-red-400"></div>
          </div>

          <div>
            <div>
              <InputField
                // icon={UserIcon}
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                register={register('confirmPassword', {
                  required: true,
                  minLength: 6,
                })}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.confirmPassword && (
                <> A minimum of 3 characters is required</>
              )}
            </p>
          </div>
        </div>

        {/* Search field */}

        <div className="mt-2">
          <RadioButton
            register={register('confirmPassword', { required: true })}
            name={'agreeCondition'}
            linkLabel1={'Privacy Policy'}
            linkLabel2={'Cookies Policy'}
            title={'By clicking Sign Up You agree to our Term,'}
            link1={'/'}
            link2={'/'}
          />
          <p className="mt-1 text-sm text-red-400">
            {errors?.agreeCondition && (
              <> A minimum of 3 characters is required</>
            )}
          </p>
        </div>
        <div className="w-full my-5">
          <div
            // disabled=
            // variant={!isValid || isLoading ? 'disabled' : 'mainColor'}
            className={`w-full py-4 rounded-3xl cursor-pointer flex justify-center ${!isValid || isLoading ? '  bg-blueLine ' : ' bg-primary'}`}
            onClick={() => setStep(true)}
          >
            {/* {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : ( */}
            <h1 className=" font-medium">Next step for registration </h1>
            {/* )} */}
          </div>
        </div>
        <div className="w-full ">
          <p className="mb-[1rem] text-center mt-3 ">
            Already have an account ?
          </p>
          <Button
            href="/login"
            variant="mainColorTwo"
            className="w-full py-4 mb-3 tex-white font-[visby-regular]"
          >
            Sign In
          </Button>
        </div>
      </form>

      <div
        className={`w-[40%] m-auto h-full ${step ? 'flex' : 'hidden'} justify-center items-center z-20 `}
      >
        <OnboardingModal />
      </div>

      <div className=" absolute w-full md:h-1/2 h-1/4 bottom-0 left-0 overflow-hidden z-10 ">
        <Image
          src={vector}
          className=" object-cover "
          alt={'vector'}
          width={1900}
        />
      </div>
    </div>
  );
};

export default SignUpModule;
