"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";

const themes = [
  {
    label: "Light",
    value: "light",
    icon: <Sun className="h-4 w-4 mr-2 text-yellow-500" />,
  },
  {
    label: "Dark",
    value: "dark",
    icon: <Moon className="h-4 w-4 mr-2 text-gray-800 dark:text-gray-200" />,
  },
  {
    label: "System",
    value: "system",
    icon: <Monitor className="h-4 w-4 mr-2 text-blue-500" />,
  },
];

export default function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark" | "system">(
    "light"
  );

  // 確保掛載後才更新最新的主題模式
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme as "light" | "dark" | "system");
    }
  }, [resolvedTheme, mounted]);

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
    );
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Sun
            className={`absolute h-5 w-5 text-yellow-500 transition-transform duration-300 ${
              currentTheme === "dark"
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />

          <Moon
            className={`absolute h-5 w-5 text-gray-800 transition-transform duration-300 ${
              currentTheme === "dark"
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ label, value, icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleThemeChange(value)}
            className={
              theme === value || (value === "system" && theme === "system") ? "bg-gray-200 dark:bg-gray-800" : ""
            }
          >
            {icon}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
