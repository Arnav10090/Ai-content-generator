"use client";

import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";

function BillingWarning() {
  const { totalUsage } = useContext(TotalUsageContext);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (totalUsage >= 10000) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [totalUsage]);

  if (!showWarning) {
    return null;
  }

  return (
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 m-4 rounded-md flex justify-between items-center">
        <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4" />
            <div>
                <p className="font-bold">You have exceeded your credit limit.</p>
                <p className="text-sm">Please upgrade your plan to continue generating new content.</p>
            </div>
        </div>
        <Link href="/dashboard/billing">
            <Button variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer">Upgrade</Button>
        </Link>
    </div>
  );
}

export default BillingWarning; 