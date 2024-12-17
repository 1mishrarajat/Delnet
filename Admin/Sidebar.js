

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  UsersIcon,
  CogIcon,
  BookOpenIcon,
  UserCircleIcon,
  MenuIcon,
  XIcon,
  BellIcon,
} from '@heroicons/react/outline';

export default function AdminPanel() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMouseEnter = () => {
    if (!isMobileSidebarOpen) {
      setSidebarOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
    
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-teal-600 p-2 rounded-lg text-white shadow-lg"
      >
        {isMobileSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${
          isSidebarOpen ? 'md:w-64' : 'md:w-20'
        } ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 bg-teal-600 text-white h-full flex flex-col shadow-lg fixed md:relative z-40 
          transition-[width,transform] duration-500 ease-in-out`}
      >
     
        <div className="flex items-center justify-center py-6">
          <UserCircleIcon className={`${isSidebarOpen ? 'h-12 w-12' : 'h-10 w-10'} text-white`} />
        </div>

        <nav className="flex-1 space-y-4 mt-4">
          <Link href="/Admin" legacyBehavior>
            <a className="flex items-center py-3 px-5 hover:bg-teal-700 rounded-lg transition group">
              <HomeIcon className="h-6 w-6 text-white" />
              {isSidebarOpen && <span className="ml-4 font-medium">Dashboard</span>}
            </a>
          </Link>
          <Link href="/Admin/Journals" legacyBehavior>
            <a className="flex items-center py-3 px-5 hover:bg-teal-700 rounded-lg transition group">
              <BookOpenIcon className="h-6 w-6 text-white" />
              {isSidebarOpen && <span className="ml-4 font-medium">Journals</span>}
            </a>
          </Link>
          <Link href="/Admin/Customers" legacyBehavior>
            <a className="flex items-center py-3 px-5 hover:bg-teal-700 rounded-lg transition group">
              <UsersIcon className="h-6 w-6 text-white" />
              {isSidebarOpen && <span className="ml-4 font-medium">Customers</span>}
            </a>
          </Link>
          <Link href="/Admin/Subscription" legacyBehavior>
            <a className="flex items-center py-3 px-5 hover:bg-teal-700 rounded-lg transition group">
              <BellIcon className="h-6 w-6 text-white" />
              {isSidebarOpen && <span className="ml-4 font-medium">Subscription</span>}
            </a>
          </Link>
          <Link href="/Admin/Settings" legacyBehavior>
            <a className="flex items-center py-3 px-5 hover:bg-teal-700 rounded-lg transition group">
              <CogIcon className="h-6 w-6 text-white" />
              {isSidebarOpen && <span className="ml-4 font-medium">Settings</span>}
            </a>
          </Link>
        </nav>
      </aside>
    </div>
  );
}
