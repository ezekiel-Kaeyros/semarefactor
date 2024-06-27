import { useEffect, useState } from 'react';
import React from 'react';
import Filter from '../../../../../../../../public/icons/filter.svg';
import Image from 'next/image';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import ScenarioModal from './scenario-modal/ScenarioModal';

function ScenarioFilter() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div>
      <ScenarioModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      <div className="bg-mainDarkLight h-[50px] rounded-md w-16 flex justify-center">
        <AnimateClick>
          <Image
            src={Filter}
            alt="filter logo"
            className="h-full m-auto"
            onClick={() => setOpenModal(true)}
          />
        </AnimateClick>
      </div>
    </div>
  );
}

export default ScenarioFilter;
