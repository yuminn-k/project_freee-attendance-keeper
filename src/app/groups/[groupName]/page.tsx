"use client";

import React, { useEffect, useState } from "react";
import { Dashboard, TabsMapping } from "@/src/components/dashboard";
import { Main } from "./components/main";
import { Member } from "./components/member";
import { getDatabase, ref, get } from "firebase/database";
import { useGroup } from "@/src/contexts/GroupContext";

const ClassMain = () => {
  const { groupId } = useGroup();
  const [groupInfo, setGroupInfo] = useState({ name: "", description: "" });
  const [managerRole, setManagerRole] = useState<boolean>(true);

  const classTab = managerRole ? "Member" : "";
  const tabs = ["Main", classTab];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    Main: <Main groupId={groupId} managerRole={managerRole} />,
    Member: <Member />,
  };

  useEffect(() => {
    if (groupId) {
      const db = getDatabase();
      const groupRef = ref(db, `groups/${groupId}`);

      get(groupRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setGroupInfo({ name: data.name, description: data.description });
        } else {
          console.log("No group data available");
        }
      });
    }
  }, [groupId]);

  return (
    <>
      <div className="ms-10">
        <div className="mt-9">
          <div className="flex items-center justify-between me-10">
            <h1 className="text-black text-3xl font-medium">
              {groupInfo.name}
            </h1>
          </div>
          <p className="mt-4 text-gray-400">{groupInfo.description}</p>
          <div className="border border-gray-200 w-11/12 mt-4"></div>
        </div>
        <div>
          <Dashboard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
          />
          <div className="flex flex-wrap ms-2 mt-6 ">
            <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassMain;
