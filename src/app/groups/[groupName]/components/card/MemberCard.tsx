import {MemberCardProps} from '@/src/interfaces/group';

const MemberCard = ({
  PostName,
  attendanceTime,
  leaveTime,
  status,
}: MemberCardProps) => {
  return (
    <div className="border rounded-lg min-w-52 max-w-72 h-44 border-gray-300 mr-10 mb-10 hover:shadow-md active:bg-neutral-50 focus:ring focus:ring-gray-400 transform hover:scale-105 transition duration-200 ease-in-out">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">{PostName}</h3>
        </div>
        <div className="mt-2">
          <p>出勤時間：{attendanceTime || '未登録'}</p>
          <p>退勤時間：{leaveTime || '未登録'}</p>
          <p>状態：{status}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
