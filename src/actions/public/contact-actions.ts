"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import prisma  from "@/lib/prisma";

const contactMessageSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export const createContactMessage = actionClient
  .inputSchema(contactMessageSchema)
  .action(async ({ parsedInput }) => {
    try {
      const message = await prisma.contactMessage.create({
        data: {
          name: parsedInput.name,
          email: parsedInput.email,
          phone: parsedInput.phone || null,
          message: parsedInput.message,
          isRead: false,
        },
      });

      return {
        success: true,
        data: message,
      };
    } catch (error) {
      console.error("Erreur lors de la création du message:", error);
      return {
        success: false,
        error: "Impossible d'envoyer le message. Veuillez réessayer.",
      };
    }
  });