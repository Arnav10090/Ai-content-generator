"use client";
import { Copy } from 'lucide-react';
import React, { useState } from 'react';

export interface HistoryRow {
  template: string;
  icon: string;
  aiResp: string;
  date: string;
  words: number;
}

export default function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (htmlContent: string, idx: number) => {
    // Create a temporary element to get the plain text for fallback
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
        console.error('Failed to copy plain text: ', e);
        alert('Failed to copy.'); // Keep alert for complete failure
      }
    }

    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-3 px-4 text-left font-semibold text-gray-700">TEMPLATE</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">AI RESPONSE</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">DATE</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">WORDS</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">COPY</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows.map((item, idx) => {
            const isLast = idx === rows.length - 1;
            return (
              <tr key={idx} className={
                `group border-b last:border-b-0 border-gray-100 transition-all hover:bg-gray-50`
              }>
                <td className="py-4 px-4 flex items-center gap-2 min-w-[180px]">
                  {item.icon && <img src={item.icon} alt="icon" className="w-7 h-7 rounded" />}
                  <span className="font-medium text-base">{item.template}</span>
                </td>
                <td className="py-4 px-4 text-gray-700 prose">
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
                <td className="py-4 px-4 text-gray-600 min-w-[110px]">{item.date}</td>
                <td className="py-4 px-4 text-gray-600 min-w-[70px]">{item.words}</td>
                <td className="py-4 px-4 min-w-[70px] relative">
                  <Copy
                    className='cursor-pointer text-violet-600 hover:text-violet-800 font-medium transition-transform duration-200 hover:scale-125 hover:rotate-12 underline underline-offset-2'
                    onClick={() => handleCopy(item.aiResp, idx)}
                  />
                  {copiedIdx === idx && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 z-10 bg-violet-700 text-white px-3 py-1 rounded shadow-lg text-xs font-semibold pointer-events-none animate-fade-in-out${isLast ? '-up' : ''} ${isLast ? 'bottom-10' : 'top-10'}`}
                    >
                      <span role="img" aria-label="sparkles">✨</span> Copied to clipboard!
                    </div>
                  )}
                </td>
              </tr>
            );
          }) : (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">No history found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Animation keyframes for fade-in-out */}
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