'use client';

import React, {useState} from 'react';
import {Favorite, Group, Header} from '.';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';

const Main = () => {
  const tabs = ['Group', 'Favorite'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    Group: <Group />,
    Favorite: <Favorite />,
  };

  return (
    <div className="flex h-full ms-10 bg-gray-200">
      <div className="flex-grow bg-white">
        <Header />
        <Dashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
        <div className="flex flex-wrap ms-2 mt-12 ">
          <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
        </div>
      </div>
    </div>
  );
};

export default Main;
