import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Research Next App",
  description: "Generated by create next app",
};

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}