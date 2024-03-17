import Image from "next/image";
import icons from "@/public/svgs/group";
import { ScheduleCardProps } from "@/src/interfaces/group";

const ScheduleCard = ({
  scheduleName,
  time,
  onMoreVertClick,
}: ScheduleCardProps) => {
  return (
    <>
      <div className="my-2 me-6">
        <div className="min-w-64 border-b-4 border-b-blue-400">
          <div className="flex justify-between">
            <p className="font-semibold text-medium">{scheduleName}</p>
            {
              <button onClick={onMoreVertClick}>
                <Image
                  src={icons.moreVert}
                  alt={"moreVert"}
                  width={30}
                  height={30}
                />
              </button>
            }
          </div>
          <p className="text-sm my-1">{time}</p>
        </div>
      </div>
    </>
  );
};

export default ScheduleCard;
