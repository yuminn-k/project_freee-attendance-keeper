"use client";

import { useState, useEffect } from "react";
import logos from "@/public/images/group";
import { get, getDatabase, ref } from "firebase/database";
import { Card } from "../card";
import { GroupProps } from "@/src/interfaces/group";

const Favorite = () => {
  const [groups, setGroups] = useState<GroupProps[]>([]);

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

        const favoriteGroups = groupList.filter((group) => group.isFavorite);
        setGroups(favoriteGroups);
      } else {
        console.log("No group data available");
      }
    });
  }, []);
  return (
    <>
      {groups.map((group, index) => (
        <Card
          key={index}
          ImageSrc={logos.freee}
          ClassName={group.name.replace("_", " ")}
          ClassContent={group.description}
          FavoriteChecked={group.isFavorite}
        />
      ))}
    </>
  );
};

export default Favorite;
