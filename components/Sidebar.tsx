"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  MapPin,
  Trash,
  Coins,
  Medal,
  Settings,
  Home,
  ChevronRight,
  Info,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const sidebarItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/report", label: "Report Waste", icon: MapPin },
  { href: "/collect", label: "Collect Waste", icon: Trash },
  { href: "/rewards", label: "Rewards", icon: Coins },
  { href: "/leaderboard", label: "Leaderboard", icon: Medal },
  { href: "/about", label: "About", icon: Info },
  { href: "/team", label: "Team", icon: Users },
];

interface SidebarProps {
  open: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname();

  function selectPathName(path: string) {
    if (path === "/") return "Home";
    if (path === "/report") return "Report Waste";
    if (path === "/collect") return "Collect Waste";
    if (path === "/reward") return "Rewards";
    if (path === "/leaderboard") return "Leaderboard";
    if (path === "/about") return "About";
    if (path === "/team") return "Team";

    return "";
  }
  
  const [selected, setSelected] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Update selected only after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setSelected(selectPathName(pathname));
  }, [pathname]);

  const parent = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // delay between items
      },
    },
  };

  const animateSidebar = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  return (
    <aside
      className={`bg-white border-r border-gray-400 pt-20  text-gray-800 w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <nav className="h-full flex flex-col justify-between">
        <motion.div
          variants={parent}
          initial="hidden"
          animate="visible"
          className="px-4 py-6 space-y-4"
        >
          {sidebarItems.map((item) => (
            <motion.div key={item.label} variants={animateSidebar}>
              <Link href={item.href} key={item.href} passHref>
                <Button
                  onClick={() => setSelected(item.label)}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-between py-3 cursor-pointer ${
                    pathname === item.href
                      ? "bg-green-200 text-green-800 hover:bg-green-200"
                      : "text-gray-700 hover:bg-green-100 hover:text-stone-900"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <item.icon className="mr-0.2 h-5 w-5" />
                    <span className="text-base">{item.label}</span>
                  </div>
                  {selected === item.label && (
                    <motion.div layoutId="clicked">
                      <ChevronRight />
                    </motion.div>
                  )}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="p-4">
          <Link href="/settings" passHref>
            <Button
              variant={pathname === "/settings" ? "secondary" : "outline"}
              className={`w-full justify-start cursor-pointer py-3 ${
                pathname === "/settings"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              <span className="text-base">Settings</span>
            </Button>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
