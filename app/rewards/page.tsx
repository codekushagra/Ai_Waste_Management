"use client";
import { useState, useEffect } from "react";
import {
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  AlertCircle,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CouponModal from "@/components/ui/CouponModal";
import CertificateModal from "@/components/ui/CertificateModal";
import {
  getUserByEmail,
  getRewardTransactions,
  getAvailableRewards,
  redeemReward,
  createTransaction,
  getUserBalance,
} from "@/utils/db/actions";
import { toast } from "react-hot-toast";

type Transaction = {
  id: number;
  type: "earned_report" | "earned_collect" | "redeemed";
  amount: number;
  description: string;
  date: string;
};

type Reward = {
  id: number;
  name: string;
  cost: number;
  description: string | null;
  collectionInfo: string;
};

export default function RewardsPage() {
  const [user, setUser] = useState<{
    id: number;
    email: string;
    name: string;
  } | null>(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedRewardForCertificate, setSelectedRewardForCertificate] = useState<Reward | null>(null);

  useEffect(() => {
    const fetchUserDataAndRewards = async () => {
      setLoading(true);
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          const fetchedUser = await getUserByEmail(userEmail);
          if (fetchedUser) {
            setUser(fetchedUser);
            const fetchedTransactions = await getRewardTransactions(
              fetchedUser.id
            );
            setTransactions(fetchedTransactions as Transaction[]);
            const fetchedRewards = await getAvailableRewards(fetchedUser.id);
            setRewards(fetchedRewards.filter((r) => r.cost > 0)); // Filter out rewards with 0 points
            
            // Use getUserBalance() for accurate balance calculation (includes all transactions, not just last 10)
            const userBalance = await getUserBalance(fetchedUser.id);
            setBalance(userBalance);
          } else {
            toast.error("User not found. Please log in again.");
          }
        } else {
          toast.error("User not logged in. Please log in.");
        }
      } catch (error) {
        console.error("Error fetching user data and rewards:", error);
        toast.error("Failed to load rewards data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndRewards();
  }, []);

  const handleRedeemReward = async (rewardId: number) => {
    if (!user) {
      toast.error("Please log in to redeem rewards.");
      return;
    }

    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) {
      toast.error("Invalid reward selected");
      return;
    }

    if (reward.cost <= 0 || balance < reward.cost) {
      toast.error("Insufficient balance or invalid reward cost");
      return;
    }

    // If this reward is a certificate, open certificate modal first (deduct on confirmation)
    const info = `${reward.name} ${reward.collectionInfo}`.toLowerCase();
    if (info.includes("certificate") || info.includes("cert")) {
      setSelectedRewardForCertificate(reward);
      setShowCertificateModal(true);
      return;
    }

    if (info.includes("discount") || info.includes("coupon")) {
      // For discount/coupon: redeem immediately, then show coupon modal
      try {
        await redeemReward(user.id, rewardId);
        await createTransaction(user.id, "redeemed", reward.cost, `Redeemed ${reward.name}`);
        await refreshUserData();
          try {
            const newBalance = await getUserBalance(user.id);
            window.dispatchEvent(new CustomEvent("balanceUpdate", { detail: newBalance }));
          } catch (e) {
            console.error("Failed to refresh balance after redeem:", e);
          }
        toast.success(`You have successfully redeemed: ${reward.name}`);

        const code = `CLAY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
        setCouponCode(code);
        setShowCouponModal(true);
      } catch (error) {
        console.error("Error redeeming reward:", error);
        toast.error("Failed to redeem reward. Please try again.");
      }

      return;
    }

    // Fallback: perform a generic redeem
    try {
      await redeemReward(user.id, rewardId);
      await createTransaction(user.id, "redeemed", reward.cost, `Redeemed ${reward.name}`);
      await refreshUserData();
      toast.success(`You have successfully redeemed: ${reward.name}`);
    } catch (error) {
      console.error("Error redeeming reward:", error);
      toast.error("Failed to redeem reward. Please try again.");
    }
  };

  const handleRedeemAllPoints = async () => {
    if (!user) {
      toast.error("Please log in to redeem points.");
      return;
    }

    if (balance > 0) {
      try {
        // Update database
        await redeemReward(user.id, 0);

        // Create a new transaction record
        await createTransaction(
          user.id,
          "redeemed",
          balance,
          "Redeemed all points"
        );

        // Refresh user data and rewards after redemption
        await refreshUserData();

        try {
          const newBalance = await getUserBalance(user.id);
          window.dispatchEvent(new CustomEvent("balanceUpdate", { detail: newBalance }));
        } catch (e) {
          console.error("Failed to refresh balance after redeem all:", e);
        }

        toast.success(`You have successfully redeemed all your points!`);
      } catch (error) {
        console.error("Error redeeming all points:", error);
        toast.error("Failed to redeem all points. Please try again.");
      }
    } else {
      toast.error("No points available to redeem");
    }
  };

  const refreshUserData = async () => {
    if (user) {
      const fetchedUser = await getUserByEmail(user.email);
      if (fetchedUser) {
        const fetchedTransactions = await getRewardTransactions(fetchedUser.id);
        setTransactions(fetchedTransactions as Transaction[]);
        const fetchedRewards = await getAvailableRewards(fetchedUser.id);
        setRewards(fetchedRewards.filter((r) => r.cost > 0)); // Filter out rewards with 0 points

        // Use getUserBalance() for accurate balance calculation (includes all transactions, not just last 10)
        const newBalance = await getUserBalance(fetchedUser.id);
        setBalance(newBalance);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-gray-600" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Rewards</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between h-full border-l-4 border-green-500 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reward Balance</h2>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Coins className="w-10 h-10 mr-3 text-green-500" />
            <div>
              <span className="text-4xl font-bold text-green-500">{balance}</span>
              <p className="text-sm text-gray-500">Available Points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Transactions Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center">
                    {transaction.type === "earned_report" ? (
                      <ArrowUpRight className="w-5 h-5 text-green-500 mr-3" />
                    ) : transaction.type === "earned_collect" ? (
                      <ArrowUpRight className="w-5 h-5 text-blue-500 mr-3" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-500 mr-3" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${transaction.type.startsWith("earned") ? "text-green-500" : "text-red-500"}`}>
                    {transaction.type.startsWith("earned") ? "+" : "-"}{transaction.amount}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No transactions yet</div>
            )}
          </div>
        </div>

        {/* Rewards Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Rewards</h2>
          <div className="space-y-4">
            {rewards && rewards.length > 0 ? (
              rewards.map((reward) => (
                <div key={reward.id} className="bg-white p-4 rounded-xl shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800">{reward.name}</h3>
                    <span className="text-green-500 font-semibold">{reward.cost} points</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{reward.collectionInfo}</p>
                  {reward.id === 0 ? (
                    <Button onClick={handleRedeemAllPoints} className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={balance === 0}>
                      <Gift className="w-4 h-4 mr-2" />Redeem All Points
                    </Button>
                  ) : (
                    <Button onClick={() => handleRedeemReward(reward.id)} className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={balance < reward.cost}>
                      <Gift className="w-4 h-4 mr-2" />{(reward.name || "Redeem").toLowerCase().includes("cert") ? "Generate Certificate" : "Redeem Reward"}
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-yellow-400 mr-3" />
                  <p className="text-yellow-700">No rewards available at the moment.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CouponModal open={showCouponModal} onClose={() => setShowCouponModal(false)} code={couponCode} />

      <CertificateModal
        open={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        defaultName={user?.name}
        onGenerate={async (name: string) => {
          if (!user || !selectedRewardForCertificate) {
            toast.error("Unable to generate certificate - user or reward missing");
            return;
          }
          try {
            await redeemReward(user.id, selectedRewardForCertificate.id);
            await createTransaction(user.id, "redeemed", selectedRewardForCertificate.cost, `Generated certificate for ${name}`);
            await refreshUserData();
            try {
              const newBalance = await getUserBalance(user.id);
              window.dispatchEvent(new CustomEvent("balanceUpdate", { detail: newBalance }));
            } catch (e) {
              console.error("Failed to refresh balance after certificate generation:", e);
            }
            toast.success(`Certificate generated for ${name} (demo)`);
            setShowCertificateModal(false);
          } catch (e) {
            console.error(e);
            toast.error("Failed to generate certificate. Please try again.");
          }
        }}
      />
    </div>
  );
}
