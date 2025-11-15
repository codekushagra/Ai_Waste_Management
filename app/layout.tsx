"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./global.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageLoader from "@/components/PageLoader";
import { getUserByEmail, getAvailableRewards } from "@/utils/db/actions";
import { toast } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// Routes that don't require authentication
const publicRoutes = ["/"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        
        // Check if current route is public
        const isPublicRoute = publicRoutes.includes(pathname);
        
        if (!userEmail && !isPublicRoute) {
          // User not logged in and trying to access protected route
          toast.error("Please log in to access this page");
          router.push("/");
          setIsAuthenticated(false);
        } else if (userEmail) {
          // User is logged in
          const user = await getUserByEmail(userEmail);
          if (user) {
            const availableRewards = (await getAvailableRewards(
              user.id
            )) as any;
            setTotalEarnings(availableRewards);
            setIsAuthenticated(true);
          } else {
            // Email stored but user not found in DB
            localStorage.removeItem("userEmail");
            if (!isPublicRoute) {
              toast.error("Session expired. Please log in again.");
              router.push("/");
            }
            setIsAuthenticated(false);
          }
        } else {
          // No email in storage but on public route
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        // Minimum loading time for better UX (1.5 seconds)
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    fetchUserData();
  }, [pathname, router]);

  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isLoading && <PageLoader />}
        
        {!isLoading && (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Only show header and sidebar on authenticated routes */}
            {isAuthenticated || isPublicRoute ? (
              <>
                {/*header*/}
                <Header
                  onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                  totalEarnings={totalEarnings}
                />
                <div className="flex flex-1 bg-white">
                  {/*sidebar - only show for authenticated users */}
                  {isAuthenticated && <Sidebar open={sidebarOpen} />}
                  <main className={`flex-1 p-4 lg:p-8 ${isAuthenticated ? 'ml-0 lg:ml-64' : ''} transition-all duration-300`}>
                    {children}
                  </main>
                </div>
              </>
            ) : (
              <main className="flex-1 p-4 lg:p-8">
                {children}
              </main>
            )}
          </div>
        )}
        <Toaster />
      </body>
    </html>
  );
}

