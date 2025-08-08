"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  Menu,
  Coins,
  Leaf,
  Search,
  Bell,
  User,
  ChevronDown,
  LogIn,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { useEffect, useState } from "react";
import {
  createUser,
  getUnreadNotifications,
  getUserBalance,
  getUserByEmail,
  markNotificationAsRead,
} from "@/utils/db/actions";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const clientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://ethereum-sepolia.publicnode.com",
  // ""
  displayName: "Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://assets.web3auth.io/evm-chains/sepolia.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

if (!clientId) {
  throw new Error("WEB3_AUTH_CLIENT_ID is not defined");
}

const web3Auth = new Web3Auth({
  clientId,
  // web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  web3AuthNetwork: "sapphire_devnet",
  privateKeyProvider,
});

interface HeaderProps {
  onMenuClick: () => void;
  totalEarnings: number;
}

export default function Header({ onMenuClick, totalEarnings }: HeaderProps) {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const pathname = usePathname();
  const [notification, setNotification] = useState<Notification[]>([]);
  const [balance, setBalance] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isWeb3AuthInitialized, setIsWeb3AuthInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3Auth.initModal();
        setProvider(web3Auth.provider);
        setIsWeb3AuthInitialized(true);
        if (web3Auth.connected) {
          setLoggedIn(true);
          const user = await web3Auth.getUserInfo();
          setUserInfo(user);

          if (user.email) {
            localStorage.setItem("userEmail", user.email);
            try {
              await createUser(user.email, user.name || "Anonymous User");
            } catch (error) {
              console.log("Error creating user", error);
            }
          }
        }
      } catch (error) {
        console.error("Error initializing web3Auth", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userInfo && userInfo.email) {
        const user = await getUserByEmail(userInfo.email);
        if (user) {
          const unreadNotifications = await getUnreadNotifications(user.id);
          setNotification(unreadNotifications);
        }
      }
    };
    fetchNotifications();

    const notificationInterval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(notificationInterval);
  }, [userInfo]);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (userInfo && userInfo.email) {
        const user = await getUserByEmail(userInfo.email);
        if (user) {
          const userBalance = await getUserBalance(user.id);
          setBalance(userBalance);
        }
      }
    };
    fetchUserBalance();

    const handleBalanceUpdate = (event: CustomEvent) => {
      setBalance(event.detail);
    };
    window.addEventListener(
      "balanceUpdate",
      handleBalanceUpdate as EventListener
    );
    return () =>
      window.removeEventListener(
        "balanceUpdate",
        handleBalanceUpdate as EventListener
      );
  }, [userInfo]);

  const login = async () => {
    if (!isWeb3AuthInitialized) {
      console.log("Web3Auth not initialized");
      return;
    }
    try {
      const web3AuthProvider = await web3Auth.connect();
      setProvider(web3AuthProvider);
      setLoggedIn(true);
      const user = await web3Auth.getUserInfo();
      setUserInfo(user);

      if (user.email) {
        localStorage.setItem("userEmail", user.email);
        try {
          await createUser(user.email, user.name || "Anonymous User");
        } catch (error) {
          console.log("Error creating user", error);
        }
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("Web3Auth not initialized");
      return;
    }
    try {
      await web3Auth.logout();
      setProvider(null);
      setLoggedIn(false);
      setUserInfo(null);
      localStorage.removeItem("userEmail");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const getUserInfo = async () => {
    if (web3Auth.connected) {
      const user = await web3Auth.getUserInfo();
      setUserInfo(user);

      if (user.email) {
        localStorage.setItem("userEmail", user.email);
        try {
          await createUser(user.email, user.name || "Anonymous User");
        } catch (error) {
          console.log("Error creating user", error);
        }
      }
    }
  };

  const handleNotificationClick = async (notificationId: number) => {
    await markNotificationAsRead(notificationId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <header className="bg-white text-black  border-b border-gray-400 py-0.5 sticky top-0 z-50 backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:mr-4"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6 text-black " />
          </Button>
          <Link href="/" className="flex items-center">
            <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-500 mr-1 md:mr-1" />
            {/* projectn-name */}
            <span className="font-bold text-base md:text-lg text-black">
              SwachhAI
            </span>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="search ..."
                className="w-full px-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2 ">
              <Search className="h-5 w-5 text-gray-800" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 relative ">
                <Bell className="h-5 w-5 text-white" />
                {notification.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-5">
                    {notification.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {notification.length > 0 ? (
                notification.map((notification: any) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="py-2"
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{notification.type}</span>
                      <span className="text-sm text-gray-500">
                        {notification.message}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className="py-2">
                  No new notification
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mr-2 md:mr-4 flex items-center bg-gray-100 rounded-full px-2 md:px-3 py-1">
            <Coins className="h-4 w-4 md:h-5 md:w-5 mr-1 text-green-500" />
            <span className="font-semibold text-sm md:text-base text-gray-800 select-none">
              {balance.toFixed(2)}
            </span>
          </div>

          {!loggedIn ? (
            <Button
              className="bg-green-500 hover:bg-green-6s00 text-white text-sm md:text-base "
              onClick={login}
            >
              Check In
              <LogIn className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="items-center flex "
                >
                  <User className="h-5 w-5 mr-1 " />
                  <ChevronDown className="h-4 w-4 mr-1 " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={getUserInfo}>
                  {userInfo ? userInfo.name : "Profile "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
