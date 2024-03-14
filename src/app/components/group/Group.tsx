"use client";

import { useEffect, useState } from "react";
import { Card } from "../card";
import logos from "@/public/images/group";
import { get, getDatabase, ref } from "firebase/database";
import { GroupProps } from "@/src/interfaces/group";
import { useRouter } from "next/navigation";
import { useGroup } from "@/src/contexts/GroupContext";

const Group = () => {
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const { setGroupId } = useGroup();
  const router = useRouter();

  useEffect(() => {
    const db = getDatabase();
    const groupRef = ref(db, "groups");

    get(groupRef).then((snapshot) => {
      if (snapshot.exists()) {
        const groupData = snapshot.val();
        const groupList = Object.keys(groupData).map((key) => {
          return {
            id: key,
            name: groupData[key].name,
            description: groupData[key].description,
            isFavorite: groupData[key].is_favorite,
          };
        });
        setGroups(groupList);
      } else {
        console.log("No group data available");
      }
    });
  }, []);

  const handleGroupClick = (groupId: string) => {
    setGroupId(groupId);
    router.push(`/groups/${encodeURIComponent(groupId)}`);
  };

  return (
    <>
      {groups.map((group, index) => (
        <div onClick={() => handleGroupClick(group.id)} key={index}>
          <Card
            ImageSrc={logos.freee}
            ClassName={group.name.replace("_", " ")}
            ClassContent={group.description}
            FavoriteChecked={group.isFavorite}
          />
        </div>
      ))}
    </>
  );
};

export default Group;
