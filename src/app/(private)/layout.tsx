"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Toaster } from "react-hot-toast";

import { cn } from "~/utils/helpers";
import { useUser } from "~/hooks/useUser";
import { doLogout } from "~/app/use-session";
import { MessagesIcon, VisitIcon } from "~/components/common/icons";
import { SquareIcon } from "~/components/SquareIcon";

const navigationMap = {
  INTERNAL: [
    { name: "Dashboard", href: "/internal/dashboard", icon: <SquareIcon name="pie-chart" />, current: true },
    { name: "Tenants", href: "/internal/tenants", icon: <SquareIcon name="pie-chart" />, current: false },
  ],
  PATIENT: [
    { name: "Dashboard", href: "/patient/dashboard", icon: <SquareIcon name="pie-chart" />, current: true },
    { name: "Appointments", href: "/patient/appointments", icon: <SquareIcon name="pie-chart" />, current: false },
    { name: "Health Record", href: "/patient/health-records", icon: <SquareIcon name="pie-chart" />, current: false },
    { name: "Patient Education", href: "/patient/education", icon: <SquareIcon name="pie-chart" />, current: false },
  ],
  STAFF: [
    {
      name: "Dashboard",
      href: "/staff/dashboard",
      icon: <SquareIcon name="pie-chart" />,
      current: true,
    },
    { name: "Appointments", href: "/staff/appointments", icon: <SquareIcon name="pie-chart" />, current: false },
    { name: "User Groups", href: "/staff/user-groups", icon: <SquareIcon name="pie-chart" />, current: false },
    { name: "Roles", href: "/staff/roles/permissions", icon: <SquareIcon name="pie-chart" />, current: false },
    { name: "Patient List", href: "/staff/patient-list", icon: <SquareIcon name="pie-chart" />, current: false },
  ],
} as const;

const quickLinks = [
  { name: "Visit", icon: <VisitIcon /> },
  { name: "Messages", icon: <MessagesIcon /> },
  { name: "Medication", icon: <MessagesIcon /> },
  { name: "Test Results", icon: <MessagesIcon /> },
] as const;

type NavigationNames =
  | (typeof navigationMap)[keyof typeof navigationMap][number]["name"]
  | "Settings"
  | (typeof quickLinks)[number]["name"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationNames>("Dashboard");
  const router = useRouter();
  const { user } = useUser();
  if (!user?.isLoggedIn) return null;
  const navigation = navigationMap[user.userType];

  const handleLogout = async () => {
    await doLogout("/session");
    router.push("/login");
  };

  return (
    <div className="bg-[#f6f8fb]">
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <Image alt="Patiently App" src="/logo.svg" height={32} width={32} className="h-8 w-auto" />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              item.current
                                ? "bg-gray-50 text-[#047f85]"
                                : "text-gray-700 hover:bg-gray-50 hover:text-[#047f85]",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <SquareIcon name="pie-chart" fill={item.name === activeTab ? "#336CFB" : "#DBDDE0"} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[320px] lg:flex-col bg-white m-5">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Image alt="Patiently App" src="/logo.svg" height={32} width={32} className="h-8 w-auto" />
          </div>
          <nav className="flex flex-1 flex-col mt-4">
            {(user.userType === "PATIENT" || user.userType === "STAFF") && (
              <QuickCards activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          item.name === activeTab ? "text-[#336CFB]" : "text-gray-700",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                        onClick={() => setActiveTab(item.name)}
                      >
                        <SquareIcon name="pie-chart" fill={item.name === activeTab ? "#336CFB" : "#DBDDE0"} />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  href="/user/settings"
                  onClick={() => setActiveTab("Settings")}
                  className={cn(
                    activeTab === "Settings" ? "" : "text-gray-700",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  )}
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className={cn(activeTab === "Settings" ? "text-[#047f85]" : "text-gray-400", "h-6 w-6 shrink-0")}
                  />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-transparent px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
          <div className="flex items-center justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <Image
                  alt="test"
                  height={32}
                  width={32}
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-8 w-8 rounded-full bg-gray-50"
                />
                <span className="hidden lg:flex lg:items-center">
                  <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                    Tom Cook
                  </span>
                  <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                </span>
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    href="/user/profile"
                    className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                  >
                    Your profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="w-full flex px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <main className=" lg:pl-[360px] pr-4 sm:pe-6 lg:pr-8 h-screen py-10">
        {children}
        <Toaster />
      </main>
    </div>
  );
}

export const QuickCards = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: NavigationNames;
  setActiveTab: Dispatch<SetStateAction<NavigationNames>>;
}) => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4 mb-8">
      {quickLinks.map((quickLink) => {
        return (
          <button
            key={quickLink.name}
            onClick={() => setActiveTab(quickLink.name)}
            className={cn(
              "hover:cursor-pointer w-full h-20 max-w-[127px] flex-col gap-2  rounded-2xl bg-white flex items-center justify-center text-wrap border border-gray-200",
              activeTab === quickLink.name && "text-white bg-[#336CFB]"
            )}
          >
            {quickLink.icon}
            <span className="text-xs font-bold">{quickLink.name}</span>
          </button>
        );
      })}
    </div>
  );
};
