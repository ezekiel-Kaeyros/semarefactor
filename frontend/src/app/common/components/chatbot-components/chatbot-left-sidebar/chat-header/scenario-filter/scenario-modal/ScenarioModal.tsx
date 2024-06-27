import React, { useEffect, useState } from 'react';
import CustomModal from '@/app/common/ui/modal/Modal';
import { Button } from '@/app/common/ui/button/Button';
import Filteroptions from '../filter-options/FiterOptions';
import FilterDetails from '../filtered-details/FilterDetails';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BACKEND_CHATBOT_API_URL, SCENERIOS_URL } from '@/utils/backendUrls';
import { useChatBot } from '@/app/hooks/useChatBot';
import ScenarioModalFilter from './scenarioModal/Modal';
import { useGlobalContext } from '@/app/common/contex-provider';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ScenarioModalProps {
  onClose: () => void;
  isOpen: boolean;
}

interface ScenarioProps {
  active: boolean;
  company: string;
  company_id: string;
  description: {}[];
  interactive_labels: {
    parent: string;
    child: ChildLabel[];
    uuid: string;
    selected: boolean;
  }[];
  keywords: [];
  phone_number_id: string;
  title: string;
  users: {}[];
  times: number;
  _id: string;
}

interface ChildLabel {
  parent: string;
  child?: ChildLabel[];
  uuid: string;
  selected: boolean;
}

interface IFormInput {
  selectedScenarioName: string;
}

function ScenarioModal({ onClose, isOpen }: ScenarioModalProps) {
  const {
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
    register,
    setValue,
  } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });

  const [selectedScenario, setSelectedScenario] = useState<any>(null); // State to hold the selected scenario
  const [activeScenarioLabel, setActiveScenarioLabel] = useState<string>();
  const router = useRouter();
  const handleScenarioClick = (scenario: ScenarioProps) => {
    setSelectedScenario(scenario);
    // setSelectedScenarioState(scenario);
    // router.push(`/dashboard/chatbot/${scenario.id}`);
  };

  const { setGlobalState } = useGlobalContext();

  useEffect(() => {
    setValue('selectedScenarioName', activeScenarioLabel!);
  }, [activeScenarioLabel]);

  const loadScenarios = async ({ token }: { token: string }) => {
    const response = await axios.get(SCENERIOS_URL);
    if (response.status === 200) {
      const results = response.data;
      return results;
    } else {
      return new Error('Failed to fetch data');
    }
  };

  let scenarioToken = '100609346426084';

  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllScenarios', scenarioToken],
    queryFn: () => loadScenarios({ token: scenarioToken }),
  });

  //  ;

  function handleActiveScenarioChange(
    scenarioId: string,
    scenario_label: string | any
  ) {
    // Handle the active scenario change logic here
    setActiveScenarioLabel(scenario_label);
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setGlobalState((prevState: any) => ({
      ...prevState,
      selectedScenarioLabel: data.selectedScenarioName,
    }));
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)} action={publish}>
    <div>
      <ScenarioModalFilter onClose={onClose} isOpen={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-x-10 mt-10 overflow-y-auto h-[40rem]">
            <div className="w-[40%] ml-2">
              <Filteroptions
                onScenarioClick={handleScenarioClick}
                selectedScenario={selectedScenario}
                scenarios={data}
                onActiveScenarioChange={handleActiveScenarioChange}
              />
            </div>
            <div className="w-[60%] pr-6">
              <FilterDetails
                scenarioData={selectedScenario}
                scenarioLabel={activeScenarioLabel}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex w-fit gap-x-2">
              <Button
                className="bg-transparent w-full"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full min-w-[150px]"
                onClick={onClose}
              >
                Apply Filter
              </Button>
            </div>
          </div>
        </form>
      </ScenarioModalFilter>
    </div>
  );
}

export default ScenarioModal;
