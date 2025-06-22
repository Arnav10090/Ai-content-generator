"use client"
import { createContext } from "react";

export const UpdateCreditUsageContext = createContext<{
    updateCreditUsage: number;
    setUpdateCreditUsage: (updateCreditUsage: number) => void;
}>({
    updateCreditUsage: 0,
    setUpdateCreditUsage: () => {},
}); 