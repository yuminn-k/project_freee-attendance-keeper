import { useState, useEffect } from "react";
import Image from "next/image";
import { Notice, Statistics, Schedule } from ".";
import icons from "@/public/svgs/group";

const Main = ({ groupId }: { groupId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainSections = [
    {
      title: "Notice",
      component: <Notice groupId={groupId} />,
    },
    {
      title: "Schedule",
      component: <Schedule groupId={groupId} />,
    },
    { title: "Statistics", component: <Statistics groupId={groupId} /> },
  ];

  useEffect(() => {
    console.log(`Main: ${groupId}`);
  }, []);

  return (
    <>
      <div className={`mt-2 w-11/12 ${isModalOpen ? "filter grayscale" : ""}`}>
        {mainSections.map((section, index) => (
          <div key={index}>
            <div className="flex">
              <Image
                className="me-2"
                src={icons.dropdownButton}
                alt={"dropdown"}
                width={24}
                height={24}
              />
              <div className="flex w-full justify-between">
                <h3 className="text-xl font-bold">{section.title}</h3>
              </div>
            </div>
            <div className="mb-10">{section.component}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
