"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldX, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <ShieldX className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Accès Refusé
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Cette section est réservée aux administrateurs uniquement. 
            Veuillez contacter votre administrateur si vous pensez qu&apos;il s&apos;agit d&apos;une erreur.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/sign-in">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Se connecter
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 