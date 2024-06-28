// 'use client';
// import Image from 'next/image';
// import React from 'react';
// import saveIcon from '../../../../../../../../../public/icons/chatbot/bx_save.svg';
// import { NodeDataType, useSenarioCreate } from '@/zustand_store';
// import { Edge, useStoreApi } from 'reactflow';
// import { MainModel, ResponseModel, ScenarioInput } from './types';
// import { SenarioService } from '@/services';
// import DataService from '@/services/dataService';
// import toast from 'react-hot-toast';
// import { GetSenario } from '@/services';
// import { getUserCookies } from '@/cookies/cookies';
// import { useRouter } from 'next/navigation';
// interface ButtonSaveProps {
//   edges: Edge[];
//   updateOrCreate: string | undefined;
//   cacheUpdate: GetSenario | undefined;
// }

// function ButtonSave({ edges, updateOrCreate, cacheUpdate }: ButtonSaveProps) {
//   const {
//     setNameSenario,
//     nameSenario,
//     setKeywordsSenario,
//     reset,
//     scenario_items,
//     setScenarioItems,
//     title,
//     keywords,
//     _id,
//   } = useSenarioCreate();
//   const nodesData = useSenarioCreate((state) => state.nodesData);
//   const keywordsSenario = useSenarioCreate((state) => state.keywords);
//   const { push } = useRouter();
//   function findStartNode(edges: Edge[]) {
//     const targetNodes = new Set(edges.map((edge: Edge) => edge.target));
//     for (const edge of edges) {
//       if (!targetNodes.has(edge.source)) {
//         return edge.source;
//       }
//     }
//     return undefined;
//   }
//   function getByIdScenarioItem(id: string) {
//     return scenario_items.find((item) => item.id === id);
//   }
//   function replaceIdWithUuid(objects: any[]) {
//     return objects.map(({ id, ...rest }) => ({
//       uuid: id,
//       ...rest,
//     }));
//   }
//   async function saveNewScenario() {
//     for (const edg of edges) {
//       let srcHandel: string = '';
//       if (edg.sourceHandle) {
//         srcHandel = edg.sourceHandle;
//       } else {
//         srcHandel = edg.source;
//       }

//       let scenarioItemSource = getByIdScenarioItem(srcHandel);
//       let scenarioItemTarget = getByIdScenarioItem(edg.target);

//       // change de children
//       if (scenarioItemSource && scenarioItemTarget) {
//         const updatedChildren = [
//           ...scenarioItemSource.children,
//           scenarioItemTarget.id,
//         ];

//         console.log(updatedChildren);
//         debugger;

//         scenarioItemSource = {
//           ...scenarioItemSource,
//           children: updatedChildren,
//         };
//         const updatedParent = [
//           ...scenarioItemTarget.parents,
//           scenarioItemSource.id,
//         ];

//         scenarioItemTarget = {
//           ...scenarioItemTarget,
//           parents: updatedParent,
//         };

//         setScenarioItems!([scenarioItemTarget, scenarioItemSource]);
//       }
//     }

//     const response = await new SenarioService().createScenarioItem({
//       scenario_items: replaceIdWithUuid(scenario_items),
//     });

//     const responseUpdate = await new SenarioService().editMainScenario({
//       data: {
//         title: title,
//         keywords: keywords,
//       },
//       id: _id,
//     });

//     if (response.status !== 201 && responseUpdate.status !== 201) {
//       toast.error(
//         "Un probleme survenu lors de l'enregistrement de votre scenario"
//       );
//     } else {
//       toast.success('Scenario enregistre avec success !!');
//       reset!();
//       push('/dashboard/scenarios');
//     }
//   }
//   return (
//     <div
//       onClick={() => saveNewScenario()}
//       className=" flex justify-center w-40 bg-blue-secondary py-3 px-4 rounded-3xl hover:bg-blue-600 transition-all ease-in-out cursor-pointer"
//     >
//       <p>Save Chatbot</p>
//     </div>
//   );
// }

// export { ButtonSave };
'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import saveIcon from '../../../../../../../../../public/icons/chatbot/bx_save.svg';
import { NodeDataType, useSenarioCreate } from '@/zustand_store';
import { Edge, useStoreApi } from 'reactflow';
import { MainModel, ResponseModel, ScenarioInput } from './types';
import { SenarioService } from '@/services';
import DataService from '@/services/dataService';
import toast from 'react-hot-toast';
import { GetSenario } from '@/services';
import { getUserCookies } from '@/cookies/cookies';
import { useRouter } from 'next/navigation';

interface ButtonSaveProps {
  edges: Edge[];
  updateOrCreate: string | undefined;
  cacheUpdate: GetSenario | undefined;
}

function ButtonSave({ edges, updateOrCreate, cacheUpdate }: ButtonSaveProps) {
  const {
    setNameSenario,
    nameSenario,
    setKeywordsSenario,
    reset,
    scenario_items,
    setScenarioItems,
    title,
    keywords,
    _id,
  } = useSenarioCreate();

  const { push } = useRouter();

  function updateScenarioItemsWithEdges() {
    const updatedScenarioItems = [...scenario_items];
    console.log(scenario_items);
    debugger;
    for (const edge of edges) {
      const sourceIndex =
        edge.sourceHandle !== null
          ? updatedScenarioItems.findIndex(
              (item) => item.id === edge.sourceHandle
            )
          : updatedScenarioItems.findIndex((item) => item.id === edge.source);
      const targetIndex = updatedScenarioItems.findIndex(
        (item) => item.id === edge.target
      );

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const sourceItem = updatedScenarioItems[sourceIndex];
        const targetItem = updatedScenarioItems[targetIndex];

        if (!sourceItem.children.includes(targetItem.id)) {
          sourceItem.children.push(targetItem.id);
        }

        if (!targetItem.parents.includes(sourceItem.id)) {
          targetItem.parents.push(sourceItem.id);
        }

        updatedScenarioItems[sourceIndex] = sourceItem;
        updatedScenarioItems[targetIndex] = targetItem;
      }
    }
    console.log(updatedScenarioItems);
    debugger;

    setScenarioItems!(updatedScenarioItems);
  }

  async function saveNewScenario() {
    updateScenarioItemsWithEdges();
    try {
      const response = await new SenarioService().createScenarioItem({
        scenario_items: replaceIdWithUuid(scenario_items),
      });

      const responseUpdate = await new SenarioService().editMainScenario({
        data: {
          title: title,
          keywords: keywords,
        },
        id: _id,
      });

      if (response.status === 201 && responseUpdate.status === 201) {
        toast.success('Scenario enregistre avec success !!');
        reset!();
        push('/dashboard/scenarios');
      } else {
        throw new Error(
          "Un probleme survenu lors de l'enregistrement de votre scenario"
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function replaceIdWithUuid(objects: any[]) {
    return objects.map(({ id, ...rest }) => ({
      uuid: id,
      ...rest,
    }));
  }

  return (
    <div
      onClick={saveNewScenario}
      className=" flex justify-center w-40 bg-blue-secondary py-3 px-4 rounded-3xl hover:bg-blue-600 transition-all ease-in-out cursor-pointer"
    >
      <p>Save Chatbot</p>
    </div>
  );
}

export { ButtonSave };
