'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Each } from './Each';
import Logo from '../../../../public/images/sema-logo-2.svg';
import playIcon from '../../../../public/icons/play-circle.svg';
import imageContainer from '../../../../public/images/Macbook_Air_Mockup_1 n, 1.svg';
import imageContainer_frst from '../../../../public/images/chatbot-chats-selected_1.svg';
import imageContainer_2 from '../../../../public/images/landing/chatbot-chats-selected_2.svg';
import imageContainer_3 from '../../../../public/images/landing/chatbot-chats-selected_3.svg';

import imageContainer_4 from '../../../../public/images/landing/sub_container.svg';
import EaseLogo from '../../../../public/images/parteners_images/Ease_svg.svg';
import Jcprestige from '../../../../public/images/parteners_images/logo-jc 1.svg';
import Oschuna from '../../../../public/images/parteners_images/Layer 1.svg';
import vmdoLogo from '../../../../public/images/parteners_images/vmdo_svg.svg';

import vmdoLogo_1 from '../../../../public/images/landing/Orange_Money-Logo.wine 1.svg';
import vmdoLogo_2 from '../../../../public/images/landing/pngfind 1.svg';
import vmdoLogo_3 from '../../../../public/images/landing/visa.svg';
import vmdoLogo_4 from '../../../../public/images/landing/Group.svg';

import woodTech from '../../../../public/images/parteners_images/Wood Tech_svg.svg';
import messageText from '../../../../public/icons/message-text.svg';
import messageText_01 from '../../../../public/icons/landing/people.svg';
import messageText_02 from '../../../../public/icons/landing/activity.svg';
import messageText_03 from '../../../../public/icons/landing/chart-2.svg';
import messageText_04 from '../../../../public/icons/landing/money-3.svg';

import messageText_11 from '../../../../public/icons/landing/calendar-2 (1).svg';
import messageText_12 from '../../../../public/icons/landing/language-square.svg';
import messageText_13 from '../../../../public/icons/landing/message-square.svg';

import languageSquare from '../../../../public/icons/language-square.svg';
import calendarIcon from '../../../../public/icons/calendar-2.svg';
import repctIcon from '../../../../public/icons/receipt-item.svg';
import messageIcon from '../../../../public/icons/message-square.svg';
import box from '../../../../public/icons/box.svg';
import moneyIcon from '../../../../public/images/money-icon.svg';
import phoneContainer from '../../../../public/images/phone-container.png';
import analyticsContainer from '../../../../public/images/analytics-container.png';
import chatbot from '../../../../public/images/Chatbot.png';
import chartSquare from '../../../../public/images/chart-square.svg';
import imagerycontainermobile from '../../../../public/images/imagery-container-mobile.png';
import Marquee from 'react-fast-marquee';
import tickCircle from '../../../../public/images/tick-circle.svg';
import tickCircleWhite from '../../../../public/images/tick-circle-white.svg';
import { Button } from '@/app/common/ui/button/Button';
import { Fragment } from 'react';

const links = [
  { id: 2, href: '/blog', label: 'Features' },
  { id: 3, href: '/contact', label: 'Intergrations' },
  { id: 4, href: '/contact', label: 'Pricing' },
];

export default function Home() {
  const handleChange = (e: any) => {
    // ;
  };
  return (
    <Fragment>
      <div className="pb-10 ">
        {/* navigation */}
        <nav className="max-w-full   ">
          <div className="links_container flex justify-between py-5 md:py-10 relative">
            <div className=" absolute  -left-40 -top-40 h-[576px] w-[576px] bg-[#2B45D8] rounded-full  blur-3xl opacity-20 animate-pulse transition-all ease-in-out duration-300 "></div>{' '}
            <div className="logo z-20">
              <Image
                src={Logo}
                alt="logo"
                className=" md:h-16 md:w-16 h-12 w-12 z-50"
              />
            </div>
            <div className="links flex gap-5 items-center  ">
              <Each
                of={links}
                render={(item: any) => (
                  <Link
                    href={`${item.href}`}
                    className=" font-articulat text-body-text hidden md:block text-white font-lightS text-base"
                  >
                    <p>{`${item.label}`}</p>
                  </Link>
                )}
              />

              <div className="w-[100px] hidden md:flex gap-5">
                <Button href="/login">Sign In</Button>
              </div>

              <div className="menu space-y-0.5 block md:hidden">
                <div className="menu-line bg-primary-color w-10 h-1"></div>
                <div className="menu-line bg-primary-color w-10 h-1 mx-5"></div>
              </div>
            </div>
          </div>
        </nav>
        {/* section header */}
        <section className="header lg:mt-24 space-y-8 grid place-items-center relative ">
          <div className=" absolute  -right-[15%] top-5 h-[576px] w-[576px] bg-[#E9EFFF] rounded-full  blur-3xl opacity-20  transition-all ease-in-out duration-300 "></div>{' '}
          <div className=" bg-mainDarkLight text-white px-5 py-2 text flex rounded-full">
            <div className=" flex place-items-center gap-2">
              <Image src={playIcon} width={20} height={20} alt="icon" />
              <p className=" text-xs">Watch how it Works</p>
            </div>
          </div>
          <div className="title-container space-y-5 grid place-items-center md:max-w-3xl text-center mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-visby-bold text-white">
              Elevate your business in relax mode{' '}
            </h1>
            <p className=" lg:px-20 text-white pt-5">
              Say goodbye to the stress of managing customer inquiries and
              announcements manually. Our chatbot is here to assist you 24/7,
            </p>
            <div className=" w-48 ">
              <Button>
                <p>Get 7 day Free Trial</p>
              </Button>
            </div>
          </div>
          <div className="container grid place-items-center w-full">
            <Image
              priority
              className="mx-auto  border border-gray-600 rounded-3xl"
              src={imageContainer_frst}
              alt="container-image"
            />
          </div>
        </section>

        {/* section partners */}
        <section className=" mt-28 ">
          <div className="space-y-5">
            <div className="text-center  w-full mx-auto  gap-5 ">
              <h1 className=" text-3xl text-white ">
                Sema boost 1000+ business build stronger customer relationship
                at ease
              </h1>

              <div className=" flex flex-wrap justify-between lg:gap-28 gap-5 md:max-w-fit mx-auto pt-10">
                <Image
                  src={vmdoLogo}
                  alt="parter1"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
                <Image
                  src={woodTech}
                  alt="parter2"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
                <Image
                  src={EaseLogo}
                  alt="parter3"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
                <Image
                  src={Jcprestige}
                  alt="parter4"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
                <Image
                  src={Oschuna}
                  alt="parter5"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* section circle animation */}
        <section className="flex flex-col xl:flex-row  mt-20 text-textLigthGray gap-x-5 gap-y-3 relative  ">
          <div className=" absolute  -left-40 top-40 h-[576px] w-[576px] bg-[#2B45D8] rounded-full  blur-3xl opacity-20 animate-pulse transition-all ease-in-out duration-300 "></div>{' '}
          <div className=" w-full xl:w-1/2  pt-10">
            <h1 className=" text-4xl pr-20 font-bold text-white ">
              Integrated AI Chatbot System
            </h1>
            <p className=" py-3 text-xl">
              Our chatbot is here to assist you 24/7, ensuring that your
              customers receive instant responses and personalized attention,
              even when you're taking a break.
            </p>

            <div className=" space-y-5  text-xl">
              <div className="flex font-articulat place-items-start gap-2 ">
                <Image src={messageText} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    Customizable Responses{' '}
                  </span>{' '}
                  Tailor your chatbot responses to match your brand voice and
                  style.
                </p>
              </div>
              <div className="flex font-articulat place-items-start gap-2">
                <Image src={languageSquare} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    Multilingual Support{' '}
                  </span>{' '}
                  Reach a wider audience by offering support in multiple
                  languages.
                </p>
              </div>
              <div className="flex font-articulat place-items-start gap-2">
                <Image src={box} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    Customizable Responses{' '}
                  </span>{' '}
                  Tailor your chatbot responses to match your brand voice and
                  style.
                </p>
              </div>
            </div>
            <div className=" w-1/2 py-10 ">
              <Button>
                <p>Create your chatbot</p>
              </Button>
            </div>
          </div>
          <div className=" w-full xl:flex-grow">
            <Image
              priority
              className="mx-auto block w-full  rounded-3xl"
              src={imageContainer}
              alt="container-image"
            />
          </div>
        </section>

        <section className="flex flex-col xl:flex-row  mt-20 text-textLigthGray gap-x-5 gap-y-3 relative ">
          <div className=" absolute  -right-[20%] top-5 h-[576px] w-[776px] bg-[#E9EFFF] rounded-full  blur-3xl opacity-20  transition-all ease-in-out duration-300 "></div>{' '}
          <div className=" w-full xl:w-1/2  pt-10 xl:order-last ">
            <h1 className=" text-4xl pr-20 font-bold text-white ">
              Bulk Messaging
            </h1>
            <p className=" py-3 text-xl">
              Sema is your one-stop platform for sending personalized bulk SMS
              messages to large audiences.
            </p>

            <div className=" space-y-5  text-xl">
              <div className="flex font-articulat place-items-start gap-2 ">
                <Image src={messageText_01} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    Reach Thousands with a Click:{' '}
                  </span>{' '}
                  Send targeted SMS campaigns to your entire contact list or
                  specific segments.
                </p>
              </div>
              <div className="flex font-articulat place-items-start gap-2">
                <Image src={messageText_02} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">Drive Results: </span>{' '}
                  Increase sales, appointments, event attendance, and more with
                  targeted messaging.
                </p>
              </div>
              <div className="flex font-articulat place-items-start gap-2">
                <Image src={messageText_03} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    eal-time Reporting:{' '}
                  </span>{' '}
                  Track results, analyze data, and optimize future campaigns.
                </p>
              </div>
              <div className="flex font-articulat place-items-start gap-2">
                <Image src={messageText_04} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    Affordable Pricing:{' '}
                  </span>{' '}
                  Flexible plans to suit your business needs and budget.
                </p>
              </div>
            </div>
            <div className=" w-1/2 py-10 ">
              <Button>
                <p>Start now</p>
              </Button>
            </div>
          </div>
          <div className=" w-full xl:flex-grow">
            <Image
              priority
              className="mx-auto block w-full  rounded-3xl"
              src={imageContainer_2}
              alt="container-image"
            />
          </div>
        </section>

        <section className="flex flex-col xl:flex-row  mt-20 text-textLigthGray gap-x-5 gap-y-3 relative ">
          <div className=" w-full xl:w-1/2  pt-10  ">
            <h1 className=" text-4xl pr-20 font-bold text-white ">
              No Code Intergration
            </h1>
            <p className=" py-3 text-xl">
              Our chatbot is here to assist you 2Appointment Scheduling 4/7,
              ensuring that your customers receive instant responses and
              personalized attention, even when you're taking a break.
            </p>

            <div className=" space-y-5  text-xl">
              <div className="flex font-articulat place-items-start gap-2 ">
                <Image src={messageText_11} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    Appointment Scheduling{' '}
                  </span>{' '}
                  Allow customers to book appointments or reservations
                  effortlessly through the chatbot.
                </p>
              </div>
              <div className="flex font-articulat place-items-start gap-2">
                <Image src={messageText_12} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    Product Recommendations{' '}
                  </span>{' '}
                  Enhance upselling providing personalized recommendations that
                  cater to individual customer needs.
                </p>
              </div>
              <div className="flex font-articulat place-items-start gap-2">
                <Image src={messageText_13} alt="" />
                <p className="pt-1">
                  <span className=" font-bold text-white">
                    Feedback Collection{' '}
                  </span>{' '}
                  Gather valuable feedback from customers directly through the
                  chatbot.
                </p>
              </div>
            </div>
            <div className=" w-1/2 py-10 ">
              <Button>
                <p>Start now</p>
              </Button>
            </div>
          </div>
          <div className=" w-full xl:flex-grow">
            <Image
              priority
              className="mx-auto block w-full  rounded-3xl"
              src={imageContainer_3}
              alt="container-image"
            />
          </div>
        </section>
        <section className=" mt-28 ">
          <div className="space-y-5">
            <div className="text-center  w-full mx-auto  gap-5  text-white">
              <h1 className=" text-3xl text-white ">Payment made easy</h1>
              <p className=" mt-3">
                Accept payments directly through Sema with our secure and
                integrated payment processing.
              </p>

              <div className=" flex flex-wrap justify-between lg:gap-28 gap-5 md:max-w-fit mx-auto pt-10">
                <Image
                  src={vmdoLogo_1}
                  alt="parter1"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
                <Image
                  src={vmdoLogo_2}
                  alt="parter2"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
                <Image
                  src={vmdoLogo_3}
                  alt="parter3"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
                <Image
                  src={vmdoLogo_4}
                  alt="parter4"
                  className=" h-10 w-16 md:w-auto md:h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-3xl p-px bg-gradient-to-l from-gray-600 to-transparent mt-40">
          <section className="flex flex-col xl:flex-row  bg-mainDark p-10 text-textLigthGray gap-x-5 gap-y-3 relative  rounded-[calc(1.5rem-1px)]  ">
            <div className=" absolute  -left-40 top-40 h-[576px] w-[576px] bg-[#2B45D8] rounded-full  blur-3xl opacity-20 animate-pulse transition-all ease-in-out duration-300 "></div>{' '}
            <div className=" absolute  -right-[20%] top-5 h-[576px] w-[776px] bg-[#E9EFFF] rounded-full  blur-3xl opacity-20  transition-all ease-in-out duration-300 "></div>{' '}
            <div className=" w-full xl:w-1/2  pt-10  ">
              <h1 className=" text-4xl pr-20 font-bold text-white ">
                Why Sema? Here's What Sets Us Apart
              </h1>
              <p className=" py-3 text-xl">
                In today's competitive landscape, you need a bulk messaging
                solution that goes beyond just sending texts. Sema offers a
                powerful and feature-rich platform designed to help you achieve
                more
              </p>

              <div className=" w-1/2 py-10 ">
                <Button>
                  <p>Start now</p>
                </Button>
              </div>
            </div>
            <div className=" w-full xl:flex-grow">
              <Image
                priority
                className="mx-auto block w-full  rounded-3xl"
                src={imageContainer_4}
                alt="container-image"
              />
            </div>
          </section>
        </div>
        <section className=" mt-28 ">
          <div className="space-y-5">
            <div className="text-center  w-full mx-auto  gap-5  text-white">
              <h1 className=" text-4xl text-white ">Voices of Satisfaction</h1>
              <p className=" mt-3">What our customers are saying</p>

              <div className=" grid lg:grid-cols-3 sm:grid-cols-2 justify-center lg:gap-28 gap-5 md:max-w-fit  pt-10 mx-auto">
                <div className=" xl:w-[358px] w-[258px] xl:h-[358px] h-[256px]  p-px bg-gradient-to-l from-gray-600 to-transparent rounded-[calc(1.5rem-1px)] ">
                  <div className=" xl:w-[356px] w-[256px] xl:h-[356px] h-[256px] rounded-3xl bgRectangle1 bg-cover bg-center bg-no-repeat p-5">
                    <Image
                      src={EaseLogo}
                      alt="parter3"
                      className=" h-12 w-12  xl:h-16 xl:w-16 pt-3"
                    />
                    <p className=" text-left xl:pt-5 pt-3 text-xs xl:text-lg">
                      Sema has revolutionized our marketing communication. We
                      can now reach our entire customer base with targeted SMS
                      campaigns, resulting in a significant increase in event
                      attendance and engagement.
                    </p>
                    <div className=" text-left pt-3">
                      <h1 className=" text-lg font-bold ">Sarah Jones</h1>
                      <p className=" text-xs xl:text-lg">
                        Marketing Manager at Ease
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" xl:w-[358px] w-[258px] xl:h-[358px] h-[256px]   p-px bg-gradient-to-l from-gray-600 to-transparent rounded-[calc(1.5rem-1px)]">
                  <div className=" xl:w-[356px] w-[256px] xl:h-[356px] h-[256px] rounded-3xl bgRectangle2 bg-cover bg-center bg-no-repeat p-5">
                    <Image
                      src={Oschuna}
                      alt="parter3"
                      className=" h-12 w-12  xl:h-16 xl:w-16 pt-3"
                    />
                    <p className=" text-left xl:pt-5 pt-3 text-xs xl:text-lg">
                      Sema's real-time reporting and analytics have allowed us
                      to optimize our bulk messaging strategy for maximum
                      impact. We've seen a dramatic improvement in customer
                      retention rates .
                    </p>
                    <div className=" text-left pt-3">
                      <h1 className=" text-lg font-bold ">Marie Mballa</h1>
                      <p className=" text-xs xl:text-lg">CEO of Oschuna </p>
                    </div>
                  </div>
                </div>
                <div className="xl:w-[358px] w-[258px] xl:h-[358px] h-[256px]   p-px bg-gradient-to-l from-gray-600 to-transparent rounded-[calc(1.5rem-1px)]">
                  <div className=" xl:w-[356px] w-[256px] xl:h-[356px] h-[256px] rounded-3xl bgRectangle3 bg-cover bg-center bg-no-repeat p-5">
                    <Image
                      src={woodTech}
                      alt="parter3"
                      className=" h-12 w-12 xl:h-16 xl:w-16 pt-3"
                    />
                    <p className=" text-left xl:pt-5 pt-3 text-xs xl:text-lg">
                      Sema's user-friendly interface and affordable pricing make
                      it perfect for small businesses like mine. Integrating
                      payments directly into the platform has streamlined my
                      sales process.
                    </p>
                    <div className=" text-left pt-3">
                      <h1 className=" text-lg font-bold ">Alice Johnsons</h1>
                      <p className=" text-xs xl:text-lg">
                        Head of Sales at Woodtech
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" mt-28 px-20 ">
          <div className=" w-full h-[600px] relative overflow-hidden ">
            <div className=" absolute lg:-top-[calc((100vw+300px)/2)] -top-[calc(300px)] h-[calc(100vw-300px)] w-full sectionFooter rounded-full blur-lg opacity-40 transition-all ease-in-out duration-300 "></div>{' '}
          </div>
        </section>
      </div>
    </Fragment>
  );
}
