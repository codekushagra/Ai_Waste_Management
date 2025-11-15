import { db } from "./dbConfig";
import { Notifications, Reports, Rewards, Transactions, Users, CollectedWastes, CollectionOTP } from "./schema";
import { eq, sql, and, desc } from "drizzle-orm";

export async function createUser(email: string, name: string) {
  try {
    const [user] = await db
      .insert(Users)
      .values({ email, name })
      .returning()
      .execute();
    return user;
  } catch (error) {
    console.log("Error creating user", error);
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const [user] = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email))
      .execute();
    return user;
  } catch (error) {
    console.log("Error fetching user", error);
    return null;
  }
}
export async function getRecentReports(limit: number = 10) {
  try {
    const reports = await db
      .select()
      .from(Reports)
      .orderBy(desc(Reports.createdAt))
      .limit(limit)
      .execute();
    return reports;
  } catch (error) {
    console.error("Error fetching recent reports:", error);
    return [];
  }
}
export async function getAvailableRewards(userId: number) {
  try {
    console.log("Fetching available rewards for user:", userId);

    // Get user's total points
    const userTransactions = await getRewardTransactions(userId);
    const userPoints = (userTransactions || []).reduce((total, transaction) => {
      return transaction.type.startsWith("earned")
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);

    console.log("User total points:", userPoints);
    // Get available rewards from the database
    const dbRewards = await db
      .select({
        id: Rewards.id,
        name: Rewards.name,
        cost: Rewards.points,
        description: Rewards.description,
        collectionInfo: Rewards.collectionInfo,
      })
      .from(Rewards)
      .where(eq(Rewards.isAvailable, true))
      .execute();

    console.log("Rewards from database:", dbRewards);

    // Combine user points and database rewards
    const allRewards = [
      {
        id: 0, // Use a special ID for user's points
        name: "Your Points",
        cost: userPoints,
        description: "Redeem your earned points",
        collectionInfo: "Points earned from reporting and collecting waste",
      },
      ...dbRewards,
    ];

    console.log("All available rewards:", allRewards);
    return allRewards;
  } catch (error) {
    console.error("Error fetching available rewards:", error);
    return [];
  }
}

export async function getUnreadNotifications(userId: number) {
  try {
    return await db
      .select()
      .from(Notifications)
      .where(
        and(eq(Notifications.userId, userId), eq(Notifications.isRead, false))
      )
      .execute();
  } catch (error) {
    console.log("Error fetching notifications", error);
    return null;
  }
}

export async function getUserBalance(userId: number): Promise<number> {
  const transactions = (await getRewardTransactions(userId)) || [];

  if (!transactions) return 0;
  const balance = transactions.reduce((acc: number, transaction: any) => {
    return transaction.type.startsWith("earned")
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  return Math.max(balance, 0);
}

export async function getRewardTransactions(userId: number) {
  try {
    const transactions = await db
      .select({
        id: Transactions.id,
        type: Transactions.type,
        amount: Transactions.amount,
        description: Transactions.description,
        date: Transactions.date,
      })
      .from(Transactions)
      .where(eq(Transactions.userId, userId))
      .orderBy(desc(Transactions.date))
      .limit(10)
      .execute();

    const formattedTransactions = transactions.map((t) => ({
      ...t,
      date: t.date.toISOString().split("T")[0],
    }));
    return formattedTransactions;
  } catch (error) {
    console.log("Error fetching transactions", error);
    return null;
  }
}

export async function markNotificationAsRead(notificationId: number) {
  try {
    await db
      .update(Notifications)
      .set({ isRead: true })
      .where(eq(Notifications.id, notificationId))
      .execute();
  } catch (error) {
    console.log("Error marking notification as read", error);
  }
}

export async function clearAllNotifications(userId: number) {
  try {
    await db
      .update(Notifications)
      .set({ isRead: true })
      .where(eq(Notifications.userId, userId))
      .execute();
  } catch (error) {
    console.log("Error clearing all notifications", error);
  }
}

export async function createReport(
  userId: number,

  location: string,
  wasteType: string,
  amount: string,
  imageUrl?: string,
  number?: string,

  verificationResult?: any
) {
  try {
    const [report] = await db
      .insert(Reports)
      .values({
        userId: userId,
        location,
        number: number || "",
        wasteType,
        amount,
        imageUrl,
        verificationResult,
        status: "pending",
      })
      .returning()
      .execute();

    const pointsEarned = 10; // Example points earned for each report

    // update reward point
    await updateRewardPoints(userId, pointsEarned);

    // create transaction
    await createTransaction(
      userId,
      "earned_report",
      pointsEarned,
      `Earned ${pointsEarned} points for reporting waste`
    );

    // create notification
    await createNotification(
      userId,
      `You earned ${pointsEarned} points for reporting waste`,
      "reward"
    );

    return report;
  } catch (error) {
    console.error("Error creating report", error);

    return null;
  }
}
export async function updateRewardPoints(userId: number, pointsToAdd: number) {
  try {
    const [updatedReward] = await db
      .update(Rewards)
      .set({
        points: sql`${Rewards.points} + ${pointsToAdd}`,
      })
      .where(eq(Rewards.userId, userId))
      .returning()
      .execute();
    return updatedReward;
  } catch (error) {
    console.error("Error updating reward points", error);
  }
}

export async function createTransaction(
  userId: number,
  type: "earned_report" | "earned_collect" | "redeemed",
  amount: number,
  description: string
) {
  try {
    const [transaction] = await db
      .insert(Transactions)
      .values({
        userId,
        type,
        amount,
        description,
      })
      .returning()
      .execute();
    return transaction;
  } catch (error) {
    console.error("Error creating transaction", error);
    throw error;
  }
}

export async function createNotification(
  userId: number,
  message: string,
  type: string
) {
  try {
    const [notification] = await db
      .insert(Notifications)
      .values({
        userId,
        message,
        type,
      })
      .returning()
      .execute();
    return notification;
  } catch (error) {
    console.error("Error creating notification", error);
    throw error;
  }
}

export async function getWasteCollectionTasks(userId?: number) {
  try {
    // Optimize: Select only needed columns instead of all columns
    const baseQuery = db
      .select({
        id: Reports.id,
        location: Reports.location,
        wasteType: Reports.wasteType,
        amount: Reports.amount,
        status: Reports.status,
        createdAt: Reports.createdAt,
        collectorId: Reports.collectorId,
        number: Reports.number,
      })
      .from(Reports)
    
    let whereClause;
    if (userId) {
      // Include pending, in_progress, verified, collected, and completed tasks
      whereClause = sql`${Reports.status} IN ('pending', 'in_progress', 'verified', 'collected', 'completed') OR ${Reports.collectorId} = ${userId}`
    } else {
      // Default: return pending tasks only
      whereClause = eq(Reports.status, 'pending')
    }
    
    const tasks = await baseQuery
      .where(whereClause)
      .orderBy(desc(Reports.createdAt))
      .limit(100) // Add limit to prevent fetching too many rows
      .execute();
    
    return tasks;
  } catch (error) {
    console.error("Error fetching waste collection tasks:", error);
    return [];
  }
}

export async function updateTaskStatus(
  taskId: number,
  newStatus: string,
  collectorId: number
) {
  try {
    const [updatedTask] = await db
      .update(Reports)
      .set({
        status: newStatus,
        collectorId: newStatus === "in_progress" ? collectorId : undefined,
      })
      .where(eq(Reports.id, taskId))
      .returning()
      .execute();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task status:", error);
    return null;
  }
}

export async function saveCollectedWaste(
  reportId: number,
  collectorId: number,
  verificationResult: any,
  verifierName?: string,
  verifierNumber?: string
) {
  try {
    const values: any = {
      reportId,
      collectorId,
      collectionDate: new Date(),
      status: "collected",
    };

    if (verifierName) values.verifierName = verifierName;
    if (verifierNumber) values.verifierNumber = verifierNumber;

    const [collectedWaste] = await db
      .insert(CollectedWastes)
      .values(values)
      .returning()
      .execute();

    // Update report status to collected
    await db
      .update(Reports)
      .set({ status: "collected" })
      .where(eq(Reports.id, reportId))
      .execute();

    return collectedWaste;
  } catch (error) {
    console.error("Error saving collected waste:", error);
    return null;
  }
}

export async function saveReward(userId: number, rewardAmount: number) {
  try {
    // Create a transaction for the reward
    const [transaction] = await db
      .insert(Transactions)
      .values({
        userId,
        type: "earned_collect",
        amount: rewardAmount,
        description: `Earned ${rewardAmount} points for collecting waste`,
      })
      .returning()
      .execute();

    // Update reward points
    await updateRewardPoints(userId, rewardAmount);

    // Create notification
    await createNotification(
      userId,
      `You earned ${rewardAmount} points for collecting waste`,
      "reward"
    );

    return transaction;
  } catch (error) {
    console.error("Error saving reward:", error);
    return null;
  }
}

export async function getImpactStats() {
  try {
    // Get total waste collected (sum of amounts from collected wastes)
    const collectedWasteResult = await db
      .select({ total: sql<string>`COUNT(*)` })
      .from(CollectedWastes)
      .execute();

    const totalCollected = parseInt(collectedWasteResult[0]?.total || "0");

    // Get total reports submitted
    const reportsResult = await db
      .select({ total: sql<string>`COUNT(*)` })
      .from(Reports)
      .execute();

    const totalReports = parseInt(reportsResult[0]?.total || "0");

    // Get total tokens earned (sum of earned_collect transactions)
    const tokensResult = await db
      .select({ total: sql<number>`COALESCE(SUM(${Transactions.amount}), 0)` })
      .from(Transactions)
      .where(eq(Transactions.type, "earned_collect"))
      .execute();

    const totalTokens = tokensResult[0]?.total || 0;

    // Calculate CO2 offset (roughly 1 kg waste = 2 kg CO2 offset)
    const co2Offset = totalCollected * 2;

    return {
      wasteCollected: totalCollected,
      reportsSubmitted: totalReports,
      tokensEarned: totalTokens,
      co2Offset: co2Offset,
    };
  } catch (error) {
    console.error("Error fetching impact stats:", error);
    // Return default values on error
    return {
      wasteCollected: 0,
      reportsSubmitted: 0,
      tokensEarned: 0,
      co2Offset: 0,
    };
  }
}

// ✅ OTP Functions
export async function generateCollectionOTP(reportId: number) {
  try {
    console.log('📌 Starting OTP generation for reportId:', reportId);
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const createdAt = new Date();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes

    console.log('📌 OTP generated:', otp, 'Expires at:', expiresAt);

    const result = await db.insert(CollectionOTP).values({
      reportId,
      otp,
      createdAt,
      expiresAt,
      isUsed: false,
    }).returning();

    console.log('📌 Database insert result:', result);

    if (!result || result.length === 0) {
      throw new Error('Failed to insert OTP into database - no result returned');
    }

    console.log('✅ OTP generated successfully:', otp);
    return {
      success: true,
      otp: otp,
      message: "OTP generated successfully",
    };
  } catch (error) {
    console.error('❌ Error generating OTP:', error);
    throw error;
  }
}

export async function verifyCollectionOTP(reportId: number, otp: string) {
  try {
    const result = await db.query.CollectionOTP.findFirst({
      where: and(
        eq(CollectionOTP.reportId, reportId),
        eq(CollectionOTP.otp, otp),
        eq(CollectionOTP.isUsed, false)
      ),
    });

    if (!result) {
      return { success: false, message: "Invalid OTP" };
    }

    // Check if OTP has expired
    if (new Date() > result.expiresAt) {
      return { success: false, message: "OTP has expired" };
    }

    // Mark OTP as used
    await db.update(CollectionOTP)
      .set({ isUsed: true })
      .where(eq(CollectionOTP.id, result.id));

    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error('Failed to verify OTP');
  }
}

export async function getCollectionOTPForReport(reportId: number) {
  try {
    const result = await db.query.CollectionOTP.findFirst({
      where: and(
        eq(CollectionOTP.reportId, reportId),
        eq(CollectionOTP.isUsed, false)
      ),
    });

    return result || null;
  } catch (error) {
    console.error('Error fetching OTP:', error);
    return null;
  }
}
