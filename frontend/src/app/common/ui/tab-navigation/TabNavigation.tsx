import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

import { TabNavigationProps } from './TabNavigation.d';

const TabNavigation: React.FC<TabNavigationProps> = ({ items }) => {
  return (
    <Tabs variant="underlined" aria-label="Dynamic tabs" items={items}>
      {(item) => (
        <Tab key={item.id} title={item.label}>
          <div>{item.content}</div>
        </Tab>
      )}
    </Tabs>
  );
};

export default TabNavigation;
