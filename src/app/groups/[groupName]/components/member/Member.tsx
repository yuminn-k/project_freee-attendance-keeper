import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { MemberCard } from "../card";
import { MemberProps } from "../../../../../interfaces/group";
import MemberModal from "./MemberModal";

interface SelectedMemberType {
  userId: string;
  attendanceRecords: any;
}

const Member = () => {
  const db = getDatabase();
  const [memberData, setMemberData] = useState<MemberProps[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    late: 0,
    onLeave: 0,
  });
  const [selectedMember, setSelectedMember] =
    useState<SelectedMemberType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    console.log("handleOut: clicked");
    const modalContainer = document.getElementById("modal-container");
    if (modalContainer && !modalContainer.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMemberClick = (userId: string) => {
    get(ref(db, `users/${userId}/attendance`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("clicked");
        const attendanceRecords = snapshot.val();
        setSelectedMember({ userId, attendanceRecords });
        openModal();
      }
    });
  };

  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
    const today = new Date(todayStr);
    const usersRef = ref(db, "users");

    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const memberInfo = Object.keys(usersData).map((userId) => {
          const userData = usersData[userId];
          let nickname;
          if (typeof userData.nickname === "string") {
            nickname = userData.nickname;
          } else if (
            typeof userData.nickname === "object" &&
            userData.nickname !== null
          ) {
            nickname =
              userData.nickname.nickname || userData.nickname.email || userId;
          } else {
            nickname = userId;
          }
          const attendanceData = userData.attendance
            ? userData.attendance[todayStr]
            : {};

          let status = attendanceData.status || "休暇";
          const vacationInfo = userData.vacation;
          if (
            vacationInfo &&
            new Date(vacationInfo.start) <= today &&
            today <= new Date(vacationInfo.end)
          ) {
            status = "休暇中";
          }

          return {
            userId,
            postName: nickname,
            attendanceTime: attendanceData.attendanceTime || "",
            leaveTime: attendanceData.leaveTime || "",
            status: status,
          };
        });

        setMemberData(memberInfo);

        const newStats = memberInfo.reduce(
          (acc, member) => {
            acc.total += 1;
            if (member.status === "休暇中") {
              acc.onLeave += 1;
            } else {
              if (member.attendanceTime && !member.leaveTime) acc.present += 1;
              if (member.status === "遅刻") acc.late += 1;
            }
            return acc;
          },
          { total: 0, present: 0, late: 0, onLeave: 0 }
        );

        setStats(newStats);
      } else {
        console.log("No users data available");
      }
    });
  }, []);

  const memberArray: MemberProps[] = [
    {
      userId: "1",
      postName: "社員例1",
      attendanceTime: "09:00",
      leaveTime: "18:00",
      status: "通常",
    },
    {
      userId: "2",
      postName: "社員例2",
      attendanceTime: "13:30",
      leaveTime: "18:00",
      status: "遅刻",
    },
    {
      userId: "3",
      postName: "社員例3",
      attendanceTime: "",
      leaveTime: "",
      status: "休暇",
    },
  ];
  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-200 rounded-lg shadow">
            <p className="text-lg font-semibold">総人数</p>
            <p className="text-2xl font-bold">{stats.total + 3}人</p>
          </div>
          <div className="p-4 bg-green-200 rounded-lg shadow">
            <p className="text-lg font-semibold">出勤</p>
            <p className="text-2xl font-bold">{stats.present + 1}人</p>
          </div>
          <div className="p-4 bg-yellow-200 rounded-lg shadow">
            <p className="text-lg font-semibold">遅刻</p>
            <p className="text-2xl font-bold">{stats.late + 1}人</p>
          </div>
          <div className="p-4 bg-red-200 rounded-lg shadow">
            <p className="text-lg font-semibold">休暇</p>
            <p className="text-2xl font-bold">{stats.onLeave + 1}人</p>
          </div>
        </div>
      </div>

      {/* <div className="mt-4 flex overflow-x-auto scrollbar-visible"> */}
      <div className="flex flex-wrap justify-center mt-4">
        {memberArray.concat(memberData).map((member, index) => (
          <div onClick={() => handleMemberClick(member.userId)} key={index}>
            <MemberCard
              key={index}
              PostName={member.postName}
              attendanceTime={member.attendanceTime || ""}
              leaveTime={member.leaveTime || ""}
              status={member.status || "休暇"}
            />
          </div>
        ))}
      </div>

      {isOpen && selectedMember && (
        <MemberModal
          attendanceRecords={selectedMember.attendanceRecords}
          onClose={() => onClose()}
        />
      )}
    </>
  );
};

export default Member;
