import { StatisticCard } from "../card";
import logos from "@/public/images/group";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { useUser } from "@/src/contexts/UserContext";

const Statistic = ({ groupId }: { groupId: string }) => {
  const { user } = useUser();
  const statisticArray = [
    { imageSrc: logos.attendance, statisticName: "出勤" },
    { imageSrc: logos.leave, statisticName: "退勤" },
    { imageSrc: logos.vacation, statisticName: "休暇" },
  ];

  const handleCardClick = (statisticName: string) => {
    if (user && user.uid) {
      if (statisticName === "休暇") {
        recordVacation(user.uid);
      } else {
        recordAttendance(user.uid, statisticName);
      }
    } else {
      console.error("ログイン状態ではありません。");
    }
  };

  const recordAttendance = async (userId: string, type: string) => {
    const db = getDatabase();
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    const attendanceRef = ref(db, `users/${userId}/attendance/${dateStr}`);

    get(child(ref(db), `users/${userId}/attendance/${dateStr}`))
      .then((snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : {};
        const currentTime = now.getHours() + now.getMinutes() / 60;

        if (type === "出勤" && currentTime >= 6) {
          const timeString = now.toLocaleTimeString();
          const newRecord = {
            ...data,
            attendanceTime: timeString,
            status: "通常",
          };
          set(attendanceRef, newRecord);
          alert("今日も頑張りましょう！");
        } else if (type === "退勤" && data.attendanceTime) {
          const timeString = now.toLocaleTimeString();
          data.leaveTime = timeString;
          if (now.getHours() < 17) {
            data.status = "早退";
          }
          set(attendanceRef, data);
          alert("お疲れ様でした :)");
        } else {
          alert("不適切な操作です。");
        }
      })
      .catch((error) => {
        console.error("Error reading data: ", error);
      });
  };

  const recordVacation = async (userId: string) => {
    const vacationStart = prompt(
      "休暇の開始日を入力してください。(YYYY-MM-DD)"
    );
    const vacationEnd = prompt("休暇の終了日を入力してください。(YYYY-MM-DD)");

    if (vacationStart && vacationEnd) {
      const db = getDatabase();
      const vacationRef = ref(db, `users/${userId}/vacation`);
      set(vacationRef, { start: vacationStart, end: vacationEnd });
      alert("休暇が記録されました。");
    } else {
      alert("休暇の日付を入力してください。");
    }
  };

  return (
    <>
      <div className="mt-2 flex overflow-x-auto scrollbar-visible">
        {statisticArray.map((statistic, index) => (
          <StatisticCard
            key={index}
            ImageSrc={statistic.imageSrc}
            StatisticName={statistic.statisticName}
            onClick={() => handleCardClick(statistic.statisticName)}
          />
        ))}
      </div>
    </>
  );
};

export default Statistic;
