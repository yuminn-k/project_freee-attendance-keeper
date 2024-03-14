import Image from "next/image";
import icons from "@/public/svgs/group";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";

const Notice = ({ groupId }: { groupId: string }) => {
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const noticeRef = ref(db, `groups/${groupId}/announcement`);

    get(noticeRef).then((snapshot) => {
      if (snapshot.exists()) {
        setNotice(snapshot.val());
      } else {
        console.log("No core time data available");
      }
    });
  }, []);

  return (
    <div className="flex items-center border rounded-lg mt-2 ps-2 h-14">
      <Image
        className="mx-2"
        src={icons.notice}
        alt={"noticeIcon"}
        width={24}
        height={24}
      />
      <div className="flex w-full justify-between">
        <p className="font-semibold text-lg">{notice}</p>
        <Image
          className="me-5"
          src={icons.moreVert}
          alt={"moreVert"}
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default Notice;
