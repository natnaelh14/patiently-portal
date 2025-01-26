import type { ComponentPropsWithoutRef } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

import { cn } from "~/utils/helpers";

export const SpinnerIcon = (props: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      height="24"
      width="24"
      className={cn("animate-spin", props.className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const MessagesIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
};

export const VisitIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
      />
    </svg>
  );
};

export const PersonalInfoIcon = (props: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="none"
      className="size-10"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.stroke ?? "black"}
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};

export const CreateAccountIcon = (props: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="none"
      className="size-10"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.stroke ?? "black"}
        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
      />
    </svg>
  );
};

export const InactiveIcon = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <span
      className={cn(
        "absolute flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400",
        props.className
      )}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
    </span>
  );
};

export const ActiveIcon = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <span
      className={cn(
        "absolute flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400",
        props.className
      )}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff7d67]" />
    </span>
  );
};

export const CompletedIcon = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <span
      className={cn(
        "absolute flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-[#ff7d67] group-hover:bg-[#ff7d67]",
        props.className
      )}
    >
      <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
    </span>
  );
};

export const DashboardIcon = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.2192 2.20659C3.7856 2.20659 1 4.99059 1 8.42579C1 11.861 3.784 14.6466 7.2192 14.6466C10.6544 14.6466 13.4384 11.8626 13.4384 8.42579H7.2192V2.20659V2.20659ZM15 7.71379C15 5.99699 14.304 4.44179 13.1792 3.31699L8.7808 7.71379H15ZM8.0064 1.35059V7.56819L12.4032 3.17139C11.1888 1.95699 9.5968 1.35059 8.0064 1.35059V1.35059Z"
        fill="#DBDDE0"
      />
    </svg>
  );
};
