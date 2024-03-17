import React from "react";
import "../../../../../styles/modal.css";

interface MemberModalProps {
  attendanceRecords: {
    [key: string]: {
      attendanceTime: string;
      leaveTime: string;
      status: string;
    };
  };
  onClose: () => void;
}

const MemberModal = ({ attendanceRecords, onClose }: MemberModalProps) => {
  let totalDays = 0;
  let totalLateDays = 0;

  Object.values(attendanceRecords).forEach((record) => {
    if (
      record.status === "出勤" ||
      record.status === "通常" ||
      record.status === "遅刻"
    ) {
      totalDays += 1;
      if (record.status === "遅刻") {
        totalLateDays += 1;
      }
    }
  });

  return (
    <div className="modal-container">
      <div className="modal-content p-4 bg-white rounded-lg shadow-xl">
        <div className="modal-header flex justify-between items-center pb-3">
          <h2 className="modal-title text-lg font-semibold">通勤統計</h2>
          <button
            className="close-button text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="stats mb-4">
          <p className="total-days text-sm">
            総出勤日数: <span className="font-medium">{totalDays}日</span>
          </p>
          <p className="total-late text-sm">
            総遅刻日数: <span className="font-medium">{totalLateDays}日</span>
          </p>
        </div>

        <div className="attendance-records">
          <h3 className="text-md font-semibold mb-2">日付別出退勤記録</h3>
          <table className="record-table w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-2 px-3">日付</th>
                <th className="py-2 px-3">出勤時間</th>
                <th className="py-2 px-3">退勤時間</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendanceRecords).map(([date, record]) => (
                <tr
                  key={date}
                  className={
                    record.status === "遅刻" ? "bg-red-100" : "bg-white"
                  }
                >
                  <td className="py-2 px-3">{date}</td>
                  <td className="py-2 px-3">{record.attendanceTime}</td>
                  <td className="py-2 px-3">{record.leaveTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
