
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldIcon, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUnifiedPremiumStatus } from "@/hooks/useUnifiedPremiumStatus";

interface PremiumCheckProps {
  featureKey: string;
  children: React.ReactNode;
}

const PremiumCheck: React.FC<PremiumCheckProps> = ({ featureKey, children }) => {
  const { isVerifying, canAccess } = useUnifiedPremiumStatus(featureKey);
  const navigate = useNavigate();

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center w-full p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!canAccess) {
    return (
      <div className="container py-8">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-amber-100">
                <LockIcon className="h-8 w-8 text-amber-500" />
              </div>
            </div>
            <CardTitle className="text-2xl">Prémiová funkce</CardTitle>
            <CardDescription>
              Tato funkce je dostupná pouze pro uživatele s prémiový účtem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Získejte Premium pro přístup ke všem funkcím aplikace Pendler Buddy a usnadněte si práci v Německu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/premium")} className="bg-amber-500 hover:bg-amber-600">
                <ShieldIcon className="mr-2 h-4 w-4" />
                Aktivovat Premium
              </Button>
              <Button variant="outline" onClick={() => navigate("/language")}>
                Zpět na výuku jazyka
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default PremiumCheck;
