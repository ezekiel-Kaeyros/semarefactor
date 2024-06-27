'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Spinner } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

import InputField from '../../../ui/forms/text-field/InputField';
import EmailIcon from '../../../../../../public/icons/loginUserIcon.svg';
import PasswordIcon from '../../../../../../public/icons/passwordIcon.svg';
import { Button } from '../../../ui/button/Button';
import Card from '../../../ui/card/Card';
import { LoginFormValues } from './loginForm.d';

import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormValues>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });

  // Triggers when submitting

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    setIsLoading(true);

    // const user = new AuthService().login(data);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Successfully toasted!');
      push('/');
    }, 1000);
  };

  return (
    <Card>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 w-full  mx-auto dark:text-white justify-center"
      >
        <h1 className="font-bold text-xl lg:text-3xl text-center">
          Log in to your Account
        </h1>
        <p className="text-center my-4">Good to see you back</p>
        <div>
          <div>
            <InputField
              icon={EmailIcon}
              name="email"
              register={register('email', {
                required: true,
                pattern: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              type="email"
              placeholder="E-mail address"
            />
          </div>
          <div>
            <InputField
              icon={PasswordIcon}
              register={register('password', { required: true, minLength: 4 })}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <p className="my-2 opacity-80">Forgotten password ?</p>
        </div>
        <div className="mt-4 w-full">
          <Button
            disabled={isLoading ? true : false}
            variant={!isValid || isLoading ? 'disabled' : 'default'}
            className="w-full"
          >
            {isLoading ? <Spinner size="sm" color="white" /> : <>Login</>}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
