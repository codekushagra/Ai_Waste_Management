"use client";

import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./global.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageLoader from "@/components/PageLoader";
import { getUserByEmail, getAvailableRewards } from "@/utils/db/actions";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          const user = await getUserByEmail(userEmail);
          console.log("user from layout", user);

          if (user) {
            const availableRewards = (await getAvailableRewards(
              user.id
            )) as any;
            console.log("availableRewards from layout", availableRewards);
            setTotalEarnings(availableRewards);
          }
        }
      } catch (error) {
        console.error("Error fetching total earnings:", error);
      } finally {
        // Minimum loading time for better UX (1.5 seconds)
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    fetchTotalEarnings();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isLoading && <PageLoader />}
        
        {!isLoading && (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/*header*/}
            <Header
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              totalEarnings={totalEarnings}
            />
            <div className="flex flex-1 bg-white">
              {/*sidebar*/}
              <Sidebar open={sidebarOpen} />
              <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
                {children}
              </main>
            </div>
          </div>
        )}
        <Toaster />
      </body>
    </html>
  );
}

