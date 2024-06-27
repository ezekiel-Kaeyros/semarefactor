'use client';

import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/utils';
import AnimateClick from '../animate-click/AnimateClick';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: any;
  iconSize?: number;
  leftIcon?: any;
  rightIcon?: any;
}

const buttonVariants = cva(
  'w-full  text-white font-medium py-[.7rem] flex justify-center px-4  rounded-full focus:outline-none focus:shadow-outline',

  {
    variants: {
      variant: {
        default: 'bg-primary  text-white hover:opacity-90',
        primary: 'bg-indigo-700 hover:bg-indigo-900',
        secondary: 'bg-[#EEF3FB] hover:opacity-90 text-[#2C353A]',
        danger: 'bg-[#B00020] w-full text-white hover:bg-red-600',
        outline:
          'bg-transparent w-full text-primary border border-primary hover:bg-primary hover:text-white hover:border-greenpale',
        disabled: 'bg-primary opacity-50 w-full text-white',
        mainColor: 'bg-primary text-white',
        mainColorTwo: 'bg-mainDarkLight text-white',
        transparent: 'bg-transparentBg text-black',
        transparentAddVar: 'bg-transparentBg border-mainColor border-[3px]',
        bgColorDark: 'bg-bgColorDark text-white',
        bgDark: 'bg-botMessageBg2 text-[#CFD4D8] rounded-md p-2 font-thin',
        addProdVariant: 'bg-addProductBg text-white',
        bgTransparent:
          'text-[#1976D2] border-1 border-[#1976D2] bg-transparent text-sm w-full',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  }
);

const Button: FC<ButtonProps> = ({
  variant,
  className,
  href,
  icon,
  children,
  leftIcon,
  rightIcon,
  iconSize,
  ...props
}) => {
  if (href) {
    return (
      <AnimateClick>
        {icon ? (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            <span className="mr-2">
              {icon ? <Image src={icon} alt={'Icon'} /> : ''}
            </span>
            <h1>{children}</h1>
          </Link>
        ) : (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            <h1>{children}</h1>
          </Link>
        )}
      </AnimateClick>
    );
  }
  return (
    // <AnimateClick>
      <button {...props} className={cn(buttonVariants({ variant, className }))}>
        {leftIcon && (
          <Image
            className="mr-2"
            src={leftIcon}
            alt={'Icon'}
            width={iconSize ? iconSize : 20}
          />
        )}

        <h1>{children}</h1>
        {rightIcon && (
          <Image
            className="ml-2"
            src={rightIcon}
            alt={'Icon'}
            width={iconSize ? iconSize : 20}
          />
        )}
      </button>
    //</AnimateClick> 
  );
};

const ButtonI: FC<ButtonProps> = ({
  variant,
  className,
  href,
  icon,
  children,
  leftIcon,
  rightIcon,
  iconSize,
  ...props
}) => {
  if (href) {
    return (
      <AnimateClick>
        {icon ? (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            {icon && <Image className="mr-2" src={icon} alt={'Icon'} />}
            {children}
          </Link>
        ) : (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            {children}
          </Link>
        )}
      </AnimateClick>
    );
  }
  return (
    // <AnimateClick>
      <button {...props} className={cn(buttonVariants({ variant, className }))}>
        <span className="flex items-center justify-center">
          {leftIcon ? (
            <span className="mr-2">
              {icon && (
                <Image
                  className="mr-2"
                  src={icon}
                  alt={'Icon'}
                  width={iconSize ? iconSize : 20}
                />
              )}
            </span>
          ) : (
            ''
          )}
          {children}
          {rightIcon ? (
            <span className="ml-2">
              {icon && (
                <Image
                  src={icon}
                  alt={'Icon'}
                  width={iconSize ? iconSize : 20}
                />
              )}
            </span>
          ) : (
            ''
          )}
        </span>
      </button>
    // </AnimateClick> 
  );
};

export { Button, ButtonI, buttonVariants };
