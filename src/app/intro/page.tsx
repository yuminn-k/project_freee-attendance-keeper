'use client';

import {useEffect, useState} from 'react';
import {Login} from './components/login';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer && !modalContainer.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-5xl font-semibold text-center">
        freee-attendance-keeper <br /> by yuminn-k
      </div>

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
