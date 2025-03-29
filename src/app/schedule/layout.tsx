"use client";

import { ReactNode } from "react";
import { ScheduleProvider } from "../models/schedule/ScheduleContextProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return <ScheduleProvider>{children}</ScheduleProvider>;
}
