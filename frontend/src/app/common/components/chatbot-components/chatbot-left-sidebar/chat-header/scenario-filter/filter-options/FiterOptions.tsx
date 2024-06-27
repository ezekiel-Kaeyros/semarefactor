import React, { useEffect, useState } from 'react';
import SearchFilter from '../../../../../../../../../public/icons/search-filter.svg';
import Image from 'next/image';
import FilterInputField from './FilterInputFeild';
// import { scenarios } from './FilterOptions';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

export interface FilterActionsProps {
  scenario: string;
  id: number;
  scenarioCases: [
    {
      label: string;
      id: number;
      data: [{ label: string; id: number }];
    },
  ];
}

interface ScenarioProps {
  active: boolean;
  company: string;
  company_id: string;
  description: {}[];
  interactive_labels: {
    parent: string;
    child: {
      parent: string;
      child: {
        parent: string;
        child: {
          parent: string;
          child: {}[];
        }[];
      };
    }[];
  }[];
  keywords: [];
  phone_number_id: string;
  title: string;
  users: {}[];
  times: number;
  _id: string;
}

interface ScenarioActionProps {
  scenarios: ScenarioProps[];
  onScenarioClick: (scenario: any) => void;
  selectedScenario: ScenarioProps;
  onActiveScenarioChange: (scenarioId: string, scenario_label: string) => void;
}

function FiterOptions({
  onScenarioClick,
  selectedScenario,
  scenarios,
  onActiveScenarioChange,
}: ScenarioActionProps) {
  const router = useRouter();
  const { interactive_labels } = useSelector(
    (state: RootState) => state.selectDetailValue
  );

  const [filteredScenarios, setFilteredScenarios] = useState<any[]>([]);
  const handleFilterChange = (filteredScenarios: ScenarioProps[]) => {
    setFilteredScenarios(filteredScenarios);
  };
  const [scenarioTitle, setScenarioTitle] = useState<string | any>();

  const mappedScenario =
    filteredScenarios.length > 0 ? filteredScenarios : scenarios;

  return (
    <div>
      <div>
        <div>
          <h1 className="mb-3 text-2xl">Filtered By</h1>
          <div className="relative">
            <FilterInputField
              type="text"
              placeholder="Search scenario"
              icon={SearchFilter}
              scenarios={scenarios}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-3 mt-10">
          {mappedScenario?.map((scenario: ScenarioProps) => {
            const trimmedTitle =
              scenario.title.length > 20
                ? scenario.title
                    .substring(0, 20)
                    .split(' ')
                    .slice(0, -1)
                    .join(' ') + '...'
                : scenario.title;

            return (
              <AnimateClick key={scenario._id}>
                <div
                  className={`py-4 flex justify-center rounded-md ${scenario?._id === selectedScenario?._id ? 'bg-[#454a4e] text-[#ffffff]' : 'bg-mainDarkLight text-[#aaabad]'}`}
                  onClick={() => {
                    onScenarioClick(scenario),
                      onActiveScenarioChange(scenario._id, scenario.title),
                      setScenarioTitle(scenario?.title);
                  }}
                >
                  <h1 className="w-fit text-xl">{trimmedTitle}</h1>
                </div>
              </AnimateClick>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FiterOptions;
