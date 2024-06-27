'use client'
import GraphProjection from '../../../../public/images/projectionChart.svg';
import RevenueGraph from '../../../../public/images/revenueChart.svg';
import logo from '../../../../public/images/logo-frame (1).svg';
import frame from '../../../../public/images/Secondary-btn (1).svg';
import RevenueByLocationGraph from '../../../../public/images/revenueByLocationChart.svg';
import SalesGraph from '../../../../public/images/salesGraph.svg';

import RevenueByLocationCard from '@/app/common/components/home/revenue-by-location-card/RevenueByLocationCard';
import RevenueCard from '@/app/common/components/home/revenue-card/RevenueCard';
import StatisticsCard from '@/app/common/components/home/statistics-card/StatisticsCard';
import Image from 'next/image';
import ProjectionCard from '@/app/common/components/home/projection-card/ProjectionCard';
import TopSellingProductsCard from '@/app/common/components/home/top-selling-products-card/TopSellingProductsCard';
import TopSalesCard from '@/app/common/components/home/top-sales-card/TopSalesCard';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
// import OnboardingModal from '@/app/common/components/modal/OnboardingModal';
import Link from 'next/link';

const Home = () => {
  const [open,setOpen]=useState(false)
  return (
    <div className="w-full my-16 pt-[20%]">
      {/* <OnboardingModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      /> */}
      {/* <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        show
      </Button> */}

      <div className="flex flex-col justify-center items-center h-full">
        <Image src={logo} alt="" />
        <p className="text-xl font-bold mt-6">Setup your account</p>
        <p className="text-sm mb-6">
          Setup your account by creating a Meta profile
        </p>
        <Link href={'onboarding'}>
          <Image
            src={frame}
            alt=""
            className="cursor-pointer opacity-80 hover:opacity-100"
          />
        </Link>
      </div>

      {/* <div className="flex justify-between space-x-4 w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
          <StatisticsCard
            content="3,781"
            percentage="+11.01%"
            title="Customers"
            type="increase"
            color="bg-[#E3F5FF]"
          />

          <StatisticsCard
            content="1,219"
            percentage="-0.03%"
            title="Orders"
            type="decrease"
            color="bg-[#F7F9FB]"
          />

          <StatisticsCard
            content="2,000,000"
            percentage="+15.03%"
            title="Revenue"
            type="increase"
            color="bg-[#E5ECF6]"
          />

          <StatisticsCard
            content="3,781"
            percentage="+6.08%"
            title="Growth"
            type="increase"
            color="bg-[#F7F9FB]"
          />
        </div>
        <div className="w-full">
          <ProjectionCard
            title="Projections vs Actuals"
            graph={
              <Image
                className="w-full"
                src={GraphProjection}
                alt="projection chart"
              />
            }
          />
        </div>
      </div>
      <div className="my-8 grid grid-cols-4  gap-4">
        <div className=" col-span-3 row-span-2 ">
          <RevenueCard
            content={
              <Image
                className="w-full"
                src={RevenueGraph}
                alt="Revenue chart"
              />
            }
            currentWeekAmount="200,000 XAF"
            previousWeekAmount="100,000 XAF"
            title="Revenue"
          />
        </div>
        <div className="col-span-1 row-span-2">
          <RevenueByLocationCard
            title="Revenue by Location"
            map={
              <Image
                className="w-full"
                src={RevenueByLocationGraph}
                alt="revenue by location chart"
              />
            }
          />
        </div>
      </div>
      <div className="grid my-8 grid-cols-4  gap-4">
        <div className="col-span-3 h-full">
          <TopSellingProductsCard title="Top selling products" />
        </div>
        <div className="col-span-1">
          <TopSalesCard
            title="Revenue by Location"
            graph={
              <Image
                className="mx-auto w-64"
                src={SalesGraph}
                alt="Sales graph"
              />
            }
          />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
