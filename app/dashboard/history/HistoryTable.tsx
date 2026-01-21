"use client";
import { Copy, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface HistoryRow {
  template: string;
  icon: string;
  aiResp: string;
  date: string;
  words: number;
}

export default function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get unique templates for filter
  const uniqueTemplates = useMemo(() => {
    const templates = Array.from(new Set(rows.map(r => r.template)));
    return templates.sort();
  }, [rows]);

  // Filter and sort data
  const filteredAndSortedRows = useMemo(() => {
    let filtered = rows;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(row =>
        row.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.aiResp.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Template filter
    if (templateFilter !== 'all') {
      filtered = filtered.filter(row => row.template === templateFilter);
    }

    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`).getTime();
      };
      
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [rows, searchTerm, templateFilter, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRows.length / rowsPerPage);
  const paginatedRows = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedRows.slice(startIdx, startIdx + rowsPerPage);
  }, [filteredAndSortedRows, currentPage, rowsPerPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, templateFilter, sortOrder, rowsPerPage]);

  const handleCopy = async (htmlContent: string, idx: number) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    try {
      const blobHtml = new Blob([htmlContent], { type: "text/html" });
      const blobText = new Blob([textContent], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": blobHtml, "text/plain": blobText })
      ]);
    } catch (err) {
      console.error("Failed to copy rich text, falling back to plain text: ", err);
      try {
        await navigator.clipboard.writeText(textContent);
      } catch (e) {
        console.error('Failed to copy plain text:', e);
        alert('Failed to copy.');
      }
    }

    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        {/* Search */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Template Filter & Sort */}
        <div className="flex gap-2 w-full md:w-auto flex-wrap">
          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
          >
            <option value="all">All Templates</option>
            {uniqueTemplates.map(template => (
              <option key={template} value={template}>{template}</option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div>
          Showing {paginatedRows.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to {Math.min(currentPage * rowsPerPage, filteredAndSortedRows.length)} of {filteredAndSortedRows.length} results
        </div>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border dark:border-gray-700 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">TEMPLATE</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">AI RESPONSE</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">DATE</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">WORDS</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">COPY</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {paginatedRows.length > 0 ? paginatedRows.map((item, idx) => {
              const isLast = idx === paginatedRows.length - 1;
              return (
                <tr key={idx} className="group border-b last:border-b-0 border-gray-100 dark:border-gray-800 transition-all">
                  <td className="py-4 px-4 flex items-center gap-2 min-w-[180px]">
                    {item.icon && <img src={item.icon} alt="icon" className="w-7 h-7 rounded" />}
                    <span className="font-medium text-base text-gray-900 dark:text-white">{item.template}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300 prose">
                    <div
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                      dangerouslySetInnerHTML={{ __html: item.aiResp }}
                    />
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400 min-w-[110px]">{item.date}</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400 min-w-[70px]">{item.words}</td>
                  <td className="py-4 px-4 min-w-[70px] relative">
                    <Copy
                      className='cursor-pointer text-violet-600 hover:text-violet-800 font-medium transition-transform duration-200 hover:scale-125 hover:rotate-12 underline underline-offset-2'
                      onClick={() => handleCopy(item.aiResp, idx)}
                    />
                    {copiedIdx === idx && (
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 z-10 bg-violet-700 text-white px-3 py-1 rounded shadow-lg text-xs font-semibold pointer-events-none animate-fade-in-out${isLast ? '-up' : ''} ${isLast ? 'bottom-10' : 'top-10'}`}
                      >
                        <span role="img" aria-label="sparkles">✨</span> Copied!
                      </div>
                    )}
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400 dark:text-gray-500">
                  {searchTerm || templateFilter !== 'all' ? 'No results found. Try adjusting your filters.' : 'No history found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first, last, current, and adjacent pages
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer min-w-[40px]"
                  >
                    {page}
                  </Button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2">...</span>;
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="cursor-pointer"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 1.5s both;
        }
        @keyframes fade-in-out-up {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        .animate-fade-in-out-up {
          animation: fade-in-out-up 1.5s both;
        }
      `}</style>
    </div>
  );
}