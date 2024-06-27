"use client"
import { useTombolaService } from '@/app/hooks/useTombolaService';
import { TombolaServiceTabTypeI } from '@/redux/features/types';
import React, { useEffect, useState } from 'react'
import ActiveProgram from './active-program/ActiveProgram';
import ProgramInfo from './program-info/ProgramInfo';
import History from './history/History';
import CreateTombolaProgram from './create-tombola-program/CreateTombolaProgram';

const TombolaServiceContent = () => {
    const { tombolaServiceTabs } = useTombolaService ()
    const [ selectedTab, setSelectedTab ] = useState <TombolaServiceTabTypeI> (); 
    const findSelectedItems = () => {
      tombolaServiceTabs && tombolaServiceTabs?.find ((tab: TombolaServiceTabTypeI) => {
        if (tab.selected === true) {
          setSelectedTab (tab)
          return tab
        }; 
      })
    }
    useEffect (() => {
      findSelectedItems (); 
    }, [tombolaServiceTabs])
    return (
      <>
        {
          selectedTab?.id === 1 ? <ActiveProgram /> : ""
        }
  
        {
          selectedTab?.id === 2 ? <ProgramInfo /> : ""
        }
  
        {
          selectedTab?.id === 3 ? <History /> : ""
        }

        {
          selectedTab?.id === 4 ? <CreateTombolaProgram /> : ""
        }
      </>
    )
}

export default TombolaServiceContent