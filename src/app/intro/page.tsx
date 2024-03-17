"use client";

import { useEffect, useState } from "react";
import { Login } from "./components/login";
import Image from "next/image";
import group from "@/public/images/group";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pr-72">
      <div className="text-5xl font-semibold text-center">
        freee-attendance-keeper
      </div>

      <div className="m-4 font-semibold text-gray-500">by yuminn-k</div>

      <Image src={group.freee} width={500} height={500} alt="mainImg" />

      <button
        onClick={openModal}
        className="bg-indigo-600 mt-4 text-white py-2 px-7 rounded-3xl"
      >
        Get Start
      </button>
      {isOpen && <Login />}
    </main>
  );
};

export default Page;
