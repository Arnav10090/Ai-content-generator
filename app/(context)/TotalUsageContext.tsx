"use client"
import { createContext } from "react";

export const TotalUsageContext = createContext<{
    totalUsage: number;
    setTotalUsage: (totalUsage: number) => void;
}>({
    totalUsage: 0,
    setTotalUsage: () => {},
}); 