"use client";

import React, { createContext, useContext, useState } from "react";

const GroupContext = createContext({
  groupId: "",
  setGroupId: (id: string) => {},
});

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }: any) => {
  const [groupId, setGroupId] = useState("");

  return (
    <GroupContext.Provider value={{ groupId, setGroupId }}>
      {children}
    </GroupContext.Provider>
  );
};
