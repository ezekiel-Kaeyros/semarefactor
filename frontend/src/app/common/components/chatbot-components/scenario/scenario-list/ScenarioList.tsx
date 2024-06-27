'use client';
import React from 'react';
import ScenarioCard from '../scenario-card/ScenarioCard';
import { SenarioService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUserCookies } from '@/cookies/cookies';
import { useLoaderData } from '@/zustand_store';
import LoaderSpinner from '@/app/common/ui/loaderSpinner';

const ScenarioList = () => {
  async function getAllSenario() {
    const hisEmail = getUserCookies().email;
    const response = await new SenarioService().getAllSenarioOfPhoneId({
      email: hisEmail,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error('Unable to load all scenarios');
      return new Error('Failed to fetch data');
    }
  }
  const query = useQuery({
    queryKey: ['listSenarios'],
    queryFn: () => getAllSenario(),
  });

  return query.isLoading ? (
    <LoaderSpinner />
  ) : (
    <div className=" w-full gap-3 grid sm:grid-cols-2  xl:grid-cols-3  2xl:grid-cols-5 ">
      {Array.isArray(query.data) &&
        query.data?.map((scenario, key) => (
          <ScenarioCard
            key={key}
            id={scenario._id}
            isActive={scenario?.active}
            name={scenario?.title}
            numberOfQuestions={scenario?.description.length}
          />
        ))}
    </div>
  );
};

export default ScenarioList;
