"use client";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="flex justify-center items-start pt-8">
      <UserProfile routing="path" path="/dashboard/setting" appearance={{
        elements: {
          rootBox: {
            transform: 'scale(0.9)',
            transformOrigin: 'top',
          }
        }
      }} />
    </div>
  );
};

export default SettingsPage; 