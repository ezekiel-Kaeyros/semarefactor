'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from '../../common/dark-mode/theme-provider/theme-provider';
import ReduxProvider from '@/redux/provider';
import close from '../../../../public/icons/close.svg';
import { Providers } from '../../common/nextui/providers';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import Image from 'next/image';
import { ThemeSwitcher } from '@/app/common/dark-mode/theme-switcher/ThemeSwitcher';
import Link from 'next/link';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <Head>
        <meta name="description">{'Swivy'}</meta>
      </Head>
      <body className={`${inter.className}  dark:bg-dark `}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Providers>
              {/* <div className="p-3">
              <AnimateClick>
                <div className="bg-[#414C50] dark:bg-[#414C50] cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
                  <ThemeSwitcher />
                </div>
              </AnimateClick>
              </div> */}

              {/* <Sidebar /> <div className="w-full ">{children}</div> */}
              {children}
              <NextTopLoader
                color="#2299DD"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              />
            </Providers>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
