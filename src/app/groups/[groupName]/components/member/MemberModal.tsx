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
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>通勤統計</h2>
        <p>総出勤日数: {totalDays}日</p>
        <p>総遅刻日数: {totalLateDays}日</p>

        <h3>日付別出退勤記録</h3>
        <ul>
          {Object.entries(attendanceRecords).map(([date, record]) => (
            <li key={date}>
              {date}: 出勤時間 - {record.attendanceTime}, 退勤時間 -{" "}
              {record.leaveTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberModal;
