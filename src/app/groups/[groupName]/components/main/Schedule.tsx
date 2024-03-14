import { useState, useEffect } from "react";
import { ScheduleCard } from "../card";
import { get, getDatabase, ref } from "firebase/database";

const Schedule = ({ groupId }: { groupId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coreTimeStart, setCoreTimeStart] = useState("");
  const [coreTimeEnd, setCoreTimeEnd] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const modalContainer = document.getElementById("modal-container");
    if (modalContainer && !modalContainer.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const coreTimeStartRef = ref(db, `groups/${groupId}/coreTime_start`);
    const coreTimeEndRef = ref(db, `groups/${groupId}/coreTime_end`);
    get(coreTimeStartRef).then((snapshot) => {
      if (snapshot.exists()) {
        setCoreTimeStart(snapshot.val());
      } else {
        console.log("No core time data available");
      }
    });

    get(coreTimeEndRef).then((snapshot) => {
      if (snapshot.exists()) {
        setCoreTimeEnd(snapshot.val());
      } else {
        console.log("No core time end data available");
      }
    });

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="ms-2 flex overflow-x-auto scrollbar-visible"
      onClick={openModal}
    >
      <ScheduleCard
        scheduleName="Core-Time"
        time={`${coreTimeStart} ~ ${coreTimeEnd}`}
        onMoreVertClick={openModal}
      />
    </div>
  );
};

export default Schedule;
