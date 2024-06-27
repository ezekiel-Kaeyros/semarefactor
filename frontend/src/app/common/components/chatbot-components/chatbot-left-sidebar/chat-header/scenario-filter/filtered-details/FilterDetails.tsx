import React, { useEffect } from 'react';
import arrowDown from '../.../../../../../../../../../../public/icons/modalarrowdown.svg';
import Image from 'next/image';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import InputField from '@/app/common/ui/forms/text-field/InputField';

export interface FilterActionsProps {
  scenarioData: {
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
  };
  scenarioLabel: string | any;
}

interface ChildLabel {
  parent: string;
  child: ChildLabel[];
  uuid: string;
  selected: boolean;
}

interface ParentLabel {
  parent: string;
  child: ChildLabel[];
  uuid: string;
  selected: boolean;
}

interface Props {
  interactive_labels: ParentLabel[] | any;
}

function FilterDetails({ scenarioData, scenarioLabel }: FilterActionsProps) {
  const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [toggleStatesSecondDepth, setToggleStatesSecondDepth] = useState<{
    [key: string]: boolean;
  }>({});

  const [selectedKey, setSelectedKey] = useState<string>();

  const toggleParent = (parentUUID: string) => {
    setToggleStates((prevToggleStates) => ({
      ...prevToggleStates,
      [parentUUID]: !prevToggleStates[parentUUID],
    }));
  };

  const toggleChild = (childUUID: string) => {
    setToggleStates((prevToggleStates) => ({
      ...prevToggleStates,
      [childUUID]: !prevToggleStates[childUUID],
    }));
  };

  const toggleStateSecondChild = (childUUID: string) => {
    setToggleStatesSecondDepth((prevToggleStates) => {
      const updatedToggleStates = { ...prevToggleStates };
      // Set the selected state of the clicked child to true
      updatedToggleStates[childUUID] = true;

      // Set the selected state of other children to false
      Object.keys(updatedToggleStates).forEach((key) => {
        if (key !== childUUID) {
          updatedToggleStates[key] = false;
        }
      });
      setSelectedKey(childUUID);
      return updatedToggleStates;
    });
  };

  // fucntion to recursively add UUID's and the selected field
  const addUUIDsAndSelected = (labels: ChildLabel[] | ParentLabel[]) => {
    labels?.forEach((label) => {
      label.uuid = uuidv4();
      label.selected = false;
      if (label.child?.length! > 0) {
        addUUIDsAndSelected(label?.child!);
      }
    });
  };

  // function to update the interactive labels with UUIDs and selected fields
  const updateInteractiveLabels = (allScenarios: ParentLabel[]) => {
    allScenarios?.forEach((label) => {
      label.uuid = uuidv4();
      label.selected = false;
      addUUIDsAndSelected(label.child);
    });
  };

  // const updatedInteractiveLevels = updateInteractiveLabels(
  //   scenarioData?.interactive_labels
  // );

  const regex = /\s+/;
  const startIndex = 20;
  const match = scenarioLabel?.substring(startIndex).match(regex);
  const endIndex = match ? match.index + startIndex : scenarioLabel?.length;
  const textUpToWhiteSpace = scenarioLabel?.substring(0, endIndex);

  useEffect(() => {
    updateInteractiveLabels(scenarioData?.interactive_labels);
  }, [scenarioData]);

  // function FilterDetails({ scenarioData }: Props) {
  if (!scenarioData) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-xl font-medium items-center">
          <h1 className="text-center">No Scenario Selected</h1>
          <h1 className="text-center">Please Select a Scenario</h1>
        </div>
      </div>
    );
  }

  const renderChildLabels = (childLabels: ChildLabel[]) => {
    return childLabels?.map((child) => {
      return (
        <div key={child.parent}>
          <p>{child.parent}</p>
          {childLabels.length > 0 &&
            // child?.child.length > 0 &&
            renderChildLabels(child?.child!)}
        </div>
      );
    });
  };

  const renderParentLabels = (parentLabels: ParentLabel[]) => {
    return parentLabels.map((parent) => (
      <div key={parent.uuid} className="">
        <AnimateClick>
          <div
            className="bg-[#2B2E31] flex justify-between items-center p-3 rounded-md"
            onClick={() => toggleParent(parent.uuid)}
          >
            <p>{parent.parent}</p>
            <Image src={arrowDown} alt="arrowdown" />
          </div>
        </AnimateClick>
        {toggleStates[parent.uuid] && parent.child?.length > 0 && (
          <div className="flex flex-col gap-y-4 ml-10 gap-4 border-l-2 pl-4 my-2">
            {parent.child.map((data) => (
              <div key={data.uuid}>
                <AnimateClick>
                  <div
                    className="pl-8 flex justify-between items-center p-3"
                    onClick={() => toggleChild(data.uuid)}
                  >
                    <div>{data.parent}</div>
                    <Image src={arrowDown} alt="arrowdown" />
                  </div>
                </AnimateClick>
                {toggleStates[data.uuid] && data.child?.length > 0 && (
                  // <div className="pl-16">{renderChildLabels(data.child)}</div>
                  <div className="ml-10 gap-4 border-l-2 pl-4">
                    <div className="grid grid-cols-2 w-fit gap-4 py-3">
                      {data.child.map((secondEmbededData) => {
                        return (
                          <div key={secondEmbededData.uuid} className="">
                            <AnimateClick>
                              <div
                                className={`${selectedKey === secondEmbededData.uuid ? 'bg-[#51575e]' : 'bg-[#2B2E31]'} rounded-full w-fit py-2 px-6`}
                                onClick={() =>
                                  toggleStateSecondChild(secondEmbededData.uuid)
                                }
                              >
                                <span>{secondEmbededData.parent}</span>
                              </div>
                            </AnimateClick>
                            {toggleStatesSecondDepth[secondEmbededData.uuid] &&
                              secondEmbededData.child?.length > 0 && (
                                <div className="flex gap-x-4 my-4">
                                  {secondEmbededData.child.map(
                                    (thirdEmbededData) => {
                                      return (
                                        <div key={thirdEmbededData.uuid}>
                                          <div className="flex gap-x-2 items-center">
                                            <input
                                              type="checkbox"
                                              className=""
                                            />
                                            <span>
                                              {thirdEmbededData.parent}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <h1 className="mb-3 text-2xl">{textUpToWhiteSpace}</h1>
      <div className="flex flex-col gap-y-2">
        {renderParentLabels(scenarioData.interactive_labels)}
      </div>
    </div>
  );
}

export default FilterDetails;
