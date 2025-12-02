"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), { ssr: false });

function OutputSection({AIOutput}:{AIOutput:string}) {
  const editorRef = useRef<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (editorRef.current && AIOutput) {
      editorRef.current.getInstance().setHTML(AIOutput);
    }
  }, [AIOutput]);

  const handleCopy = async () => {
    const htmlContent = AIOutput;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    try {
      const blobHtml = new Blob([htmlContent], { type: "text/html" });
      const blobText = new Blob([textContent], { type: "text/plain" });
      await navigator.clipboard.write([new ClipboardItem({ "text/html": blobHtml, "text/plain": blobText })]);
    } catch (err) {
      console.error("Failed to copy rich text, falling back to plain text: ", err);
      try {
        await navigator.clipboard.writeText(textContent);
      } catch (e) {
        console.error('Failed to copy plain text: ', e);
        alert('Failed to copy.');
        return; // Exit if all copy methods fail
      }
    }

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border shadow p-0 relative">
      <div className="flex justify-between items-center px-6 pt-6 pb-4">
        <h2 className="font-semibold text-lg">Your Result</h2>
        <div className="relative">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="border-2 border-violet-600 text-violet-700 hover:bg-violet-50 hover:border-violet-700 flex items-center gap-2 font-semibold cursor-pointer"
            suppressHydrationWarning
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
          {isCopied && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-violet-700 text-white px-3 py-1 rounded shadow-lg animate-fade-in-out-up text-xs font-semibold pointer-events-none">
              <span role="img" aria-label="sparkles">✨</span> Copied!
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-6">
        <Editor
          ref={editorRef}
          initialValue="Your result will appear here"
          height="400px"
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          useCommandShortcut={true}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
          ]}
        />
      </div>
       <style jsx>{`
        @keyframes fade-in-out-up {
          0% { opacity: 0; transform: translateY(0); }
          10% { opacity: 1; transform: translateY(-10px); }
          90% { opacity: 1; transform: translateY(-10px); }
          100% { opacity: 0; transform: translateY(0); }
        }
        .animate-fade-in-out-up {
          animation: fade-in-out-up 2s both;
        }
      `}</style>
    </div>
  );
}

export default OutputSection;
