import { Button } from '@/app/common/ui/button/Button';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import loginUserIcon from '../../../../public/icons/userIcon.svg';
import logo from '../../../../public/images/sema-logo-2.svg';
import vector from '../../../../public/images/Vector-background.svg';
import close from '../../../../public/icons/close.svg';
import greyPasswordIcon from '../../../../public/icons/greyPassword.png';
import { AuthService } from '@/services';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { login } from '@/redux/features/auth-slice';
import {
  getUserCookies,
  setEmailCookies,
  setUserCookies,
} from '@/cookies/cookies';

type SignInType = {
  email: string;
  contact: number;
  password: string;
  confirmPassword: string;
};

const SignInModule = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuth();
  const pathName = usePathname();
  const { push } = useRouter();
  const urlSplit = pathName.split('/');
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<SignInType>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });

  async function checkPhoneNumber(email: string) {
    const response = await new AuthService().getPhoneNumberId(email);
    if (response.status === 200 && response.data[0].phone_number_id) {
      const user = getUserCookies();
      setUserCookies({
        ...user,
        phone_number_id: response.data[0].phone_number_id,
      });
      push(`/${urlSplit[1]}/dashboard`);
    } else {
      toast.error(' your omboarding is not complete !!');
      push(`/${urlSplit[1]}/signup/omboard`);
    }
  }

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    try {
      setIsLoading(true);
      const response = new AuthService()
        .login(data)
        .then(async (result) => {
          if (result.status == 200) {
            setUserCookies({ ...result.data });
            dispatch(login(result.data));
            push(`/${urlSplit[1]}/dashboard`);
          }
        })
        .catch((error) => {
          toast.error('something wrong try again');
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        fontFamily: 'visby-regular',
      }}
      className="relative w-full h-screen flex justify-center place-items-center  px-5 "
    >
      <Link href={'/'}>
        <Image
          src={close}
          className=" absolute top-10 left-10  cursor-pointer"
          alt={'close'}
        />
      </Link>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[400px] z-20 ">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="log" className=" h-44 w-40" />
        </div>
        <div>
          <h1
            style={{
              fontFamily: 'visby-bold',
            }}
            className="text-[2.5rem] font-bold mb-4 text-center md:text-left"
          >
            Get started
          </h1>
        </div>

        <div className="flex flex-col gap-[2rem]">
          <div className="mb-[-16px]">
            <div>
              <InputField
                register={register('email', { required: true, minLength: 3 })}
                icon={loginUserIcon}
                name="email"
                placeholder="Email / Phone Number"
              />
            </div>
            <p className="mt-2 text-sm text-red-400">
              {errors?.email && <>Email or phone number not valid</>}
            </p>
          </div>

          <div className="">
            <div>
              <InputField
                icon={greyPasswordIcon}
                register={register('password', {
                  required: true,
                  minLength: 6,
                })}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <p className="mt-2 text-sm text-red-400">
              {errors?.password && <> A minimum of 3 characters is required</>}
            </p>
          </div>
        </div>

        <div>
          <p className="text-white text-sm mt-4">
            Forgotten your password?
            <Link href={'/'} className="text-primary ml-2">
              Reset Password
            </Link>
          </p>
          <div className="w-full mt-5 mb-8">
            <Button
              disabled={!isValid || isLoading ? true : false}
              variant={!isValid || isLoading ? 'disabled' : 'mainColor'}
              type="submit"
              className="w-full py-4"
            >
              {isLoading ? <Spinner size="sm" color="white" /> : <>Login</>}
            </Button>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-[1rem] text-center mt-10 ">
            Don&apos;t have an account ?
          </p>
          <Button
            href="/signup"
            variant="mainColorTwo"
            className="w-full py-4 tex-white"
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className=" absolute w-full md:h-1/2 h-1/4 bottom-0 left-0 overflow-hidden z-10 ">
        <Image
          src={vector}
          className=" object-cover "
          alt={'vector'}
          width={1900}
        />
      </div>
    </form>
  );
};

export default SignInModule;
