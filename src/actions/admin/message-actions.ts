"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import prisma  from "@/lib/prisma";

// Récupérer tous les messages
const getMessagesSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  filter: z.enum(['all', 'unread', 'read']).default('all'),
  dateFilter: z.string().optional(), // Format: YYYY-MM-DD
});

export const getMessages = actionClient
  .inputSchema(getMessagesSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { page, limit, filter, dateFilter } = parsedInput;
      const skip = (page - 1) * limit;

      const where: {
        isRead?: boolean;
        createdAt?: {
          gte: Date;
          lt: Date;
        };
      } = {};
      
      // Filtre par statut (lu/non lu)
      if (filter === 'unread') {
        where.isRead = false;
      } else if (filter === 'read') {
        where.isRead = true;
      }

      // Filtre par date
      if (dateFilter) {
        const startDate = new Date(dateFilter);
        const endDate = new Date(dateFilter);
        endDate.setDate(endDate.getDate() + 1);
        
        where.createdAt = {
          gte: startDate,
          lt: endDate,
        };
      }

      const [messages, total] = await Promise.all([
        prisma.contactMessage.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.contactMessage.count({ where }),
      ]);

      return {
        success: true,
        data: {
          messages,
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
        },
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
      return {
        success: false,
        error: "Impossible de récupérer les messages",
      };
    }
  });

// Marquer un message comme lu
const markMessageAsReadSchema = z.object({
  messageId: z.string(),
});

export const markMessageAsRead = actionClient
  .inputSchema(markMessageAsReadSchema)
  .action(async ({ parsedInput }) => {
    try {
      const message = await prisma.contactMessage.update({
        where: { id: parsedInput.messageId },
        data: { isRead: true },
      });

      return {
        success: true,
        data: message,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du message:", error);
      return {
        success: false,
        error: "Impossible de marquer le message comme lu",
      };
    }
  });

// Supprimer un message
const deleteMessageSchema = z.object({
  messageId: z.string(),
});

export const deleteMessage = actionClient
  .inputSchema(deleteMessageSchema)
  .action(async ({ parsedInput }) => {
    try {
      await prisma.contactMessage.delete({
        where: { id: parsedInput.messageId },
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Erreur lors de la suppression du message:", error);
      return {
        success: false,
        error: "Impossible de supprimer le message",
      };
    }
  });

// Marquer tous les messages comme lus
export const markAllMessagesAsRead = actionClient
  .inputSchema(z.object({}))
  .action(async () => {
    try {
      await prisma.contactMessage.updateMany({
        where: { isRead: false },
        data: { isRead: true },
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour des messages:", error);
      return {
        success: false,
        error: "Impossible de marquer tous les messages comme lus",
      };
    }
  });