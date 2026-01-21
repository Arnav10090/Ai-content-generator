"use client";

import React, { useState, useEffect } from 'react';
import Templates from '@/app/(data)/Templates';
import HistoryTable from './HistoryTable';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

function getTemplateMeta(slug: string) {
  const t = Templates.find(t => t.slug === slug);
  return t ? { name: t.name, icon: t.icon } : { name: slug, icon: '' };
}

export default function HistoryPage() {
  const { user, isLoaded } = useUser();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!isLoaded) return;
      
      if (!user?.primaryEmailAddress?.emailAddress) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post('/api/get-history', {
          email: user.primaryEmailAddress.emailAddress
        });

        const history = response.data.history || [];
        
        // Map DB rows to display rows
        const mappedRows = history.map((row: any) => {
          const { name, icon } = getTemplateMeta(row.templateSlug);
          return {
            template: name,
            icon,
            aiResp: row.aiResponse || '',
            date: row.createdAt || '',
            words: row.aiResponse ? row.aiResponse.split(/\s+/).length : 0,
          };
        });

        setRows(mappedRows);
      } catch (error) {
        console.error('Error fetching history:', error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-0px)] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-0px)] flex items-center justify-center">
        <div className="text-gray-500">Not logged in</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[calc(100vh-0px)]">
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-none shadow-none p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">History</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Search your previously generated AI content</p>
          </div>
        </div>
        <HistoryTable rows={rows} />
      </div>
    </div>
  );
}