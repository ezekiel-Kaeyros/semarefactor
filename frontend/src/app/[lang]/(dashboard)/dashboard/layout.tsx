import './globals.css';
import Head from 'next/head';
import { ThemeProvider } from '../../../common/dark-mode/theme-provider/theme-provider';
import ReduxProvider from '@/redux/provider';
import ContextThemeProvider from '@/app/common/contex-provider';

import { Providers } from '../../../common/nextui/providers';

import LayoutComponents from './LayoutComponents';
import Provider from '@/app/common/react-query/Providers';
import NextTopLoader from 'nextjs-toploader';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Toaster } from 'react-hot-toast';

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
        <meta name="description">{'DBA'}</meta>
      </Head>
      <body className={` dark:bg-dark`}>
        <ContextThemeProvider>
          <Provider>
            <ReduxProvider>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <Providers>
                  <Toaster position="top-center" reverseOrder={false} />
                  <NextTopLoader
                    color="#2299DD"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                  />
                  <SkeletonTheme baseColor="#494949" highlightColor="#7b7b7b">
                    <LayoutComponents>{children}</LayoutComponents>
                  </SkeletonTheme>
                </Providers>
              </ThemeProvider>
            </ReduxProvider>
          </Provider>
        </ContextThemeProvider>
      </body>
    </html>
  );
}
