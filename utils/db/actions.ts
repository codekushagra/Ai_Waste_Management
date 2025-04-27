import { db } from "./dbConfig";
import { Notifications, Reports, Rewards, Transactions, Users } from "./schema";
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

export async function getUnreadNotifications(userId: number) {
  try {
    
    return await db
      .select()
      .from(Notifications)
      .where(and(eq(Notifications.userId, userId), eq(Notifications.isRead, false)))
      .execute();
  } catch (error) {
    console.log("Error fetching notifications", error);
    return null;
  }
}

export async function getUserBalance(userId: number):Promise<number> {
  const transactions = await getRewardTransactions(userId)|| []

  if(!transactions) return 0;
  const balance = transactions.reduce((acc:number, transaction:any) => {
    return transaction.type.startsWith('earned') ? acc + transaction.amount : acc - transaction.amount;
  }, 0);

  return Math.max(balance, 0);
}

export async function getRewardTransactions(userId: number) { 
  try {
    const transactions = await db.select({
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
      
    const formattedTransactions = transactions.map(t=>({
      ...t,
      date: t.date.toISOString().split('T')[0]
    }))
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

export async function createReport(
  userId: number,
  location: string,
  wasteType: string,
  amount: string,
  imageUrl?: string,
  verificationResult?: any,
) {
  try {
    const [report]  = await db.insert(Reports).values({
      userId,location,wasteType,amount,imageUrl,verificationResult, status: 'pending'

    }).returning().execute()

    const pointsEarned = 10; // Example points earned for each report

    // update reward point
    await updateRewardPoints(userId, pointsEarned);

    // create transaction
    await createTransaction(userId, 'earned_report', pointsEarned, `Earned ${pointsEarned} points for reporting waste`);

    // create notification
    await createNotification(userId, `You earned ${pointsEarned} points for reporting waste`, 'reward');

    return report;
  } catch (error) {    
    console.error("Error creating report", error);
    
    return null;
  }
}
export async function updateRewardPoints(userId: number, pointsToAdd: number) {
  try {
    const [updatedReward] = await db.update(Rewards).set({
      points: sql`${Rewards.points} + ${pointsToAdd}`,

    }).where(eq(Rewards.userId, userId)).returning().execute();
    return updatedReward;
  } catch (error) {
    console.error("Error updating reward points", error);
  }
}

export async function createTransaction(userId: number, type: 'earned_report' | 'earned_collect' |'redeemed', amount: number, description: string) {
  try {
    const [transaction] = await db.insert(Transactions).values({
      userId,
      type,
      amount,
      description,
    }).returning().execute();
    return transaction;
  } catch (error) {
    console.error("Error creating transaction", error);
    throw error;
  }
   
}

export async function createNotification(userId: number, message: string, type:string) {
  try {
    const [notification] = await db.insert(Notifications).values({
      userId,
      message,
      type,
    }).returning().execute();
    return notification;
  } catch (error) {
    console.error("Error creating notification", error);
    throw error;
  }
}

export async function getRecentReports(limit: number = 10) {
  try {
    const reports = await db.select().from(Reports).orderBy(desc(Reports.createdAt)).limit(limit).execute();
  } catch (error) {
    console.error("Error fetching recent reports", error);
    return []
  }
}