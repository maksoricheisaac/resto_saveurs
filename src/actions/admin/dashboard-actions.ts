"use server";
import prisma  from "@/lib/prisma";

export const getDashboardStats = async() => {
    try {
      // Récupérer les statistiques depuis la base de données
      const [
        totalMenuItems,
        totalCategories,
        totalMessages,
        dailySpecials,
        totalSideDishes,
        unreadMessages
      ] = await Promise.all([
        prisma.menuItem.count(),
        prisma.category.count(),
        prisma.contactMessage.count(),
        prisma.menuItem.count({
          where: { isDailySpecial: true }
        }),
        prisma.sideDish.count(),
        prisma.contactMessage.count({
          where: { isRead: false }
        })
      ]);

      return {
        success: true,
        data: {
          totalMenuItems,
          totalCategories,
          totalMessages,
          dailySpecials,
          totalSideDishes,
          unreadMessages
        }
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      return {
        success: false,
        error: "Impossible de récupérer les statistiques"
      };
    }
  };