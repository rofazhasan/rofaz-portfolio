"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="flex h-[500px] border border-white/10 rounded-xl overflow-hidden bg-black">
      
      {/* Raw Text Input Pane */}
      <div className="flex-1 border-r border-white/10 flex flex-col">
        <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs font-semibold text-gray-400 tracking-wider">
          MARKDOWN RAW
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Project Title\nWrite your description here using formatting..."
          className="flex-1 w-full bg-transparent p-4 text-white focus:outline-none resize-none font-mono text-sm leading-relaxed"
        />
      </div>

      {/* Styled Live Preview Pane */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs font-semibold text-gray-400 tracking-wider">
          LIVE PREVIEW
        </div>
        <div className="flex-1 p-6 overflow-y-auto prose prose-invert prose-purple max-w-none text-gray-300">
           {/* Fallback typography for raw preview */}
           <div className="[&>h1]:text-3xl [&>h1]:font-black [&>h1]:mb-6 [&>h1]:text-white
                           [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-white
                           [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-white
                           [&>p]:mb-4 [&>p]:leading-relaxed
                           [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
                           [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
                           [&>a]:text-purple-400 [&>a]:underline
                           [&>blockquote]:border-l-4 [&>blockquote]:border-purple-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400
                           [&>pre]:bg-white/5 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto
                           [&>code]:bg-white/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded text-sm font-mono text-purple-300">
             {value ? (
               <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
             ) : (
               <div className="h-full flex items-center justify-center text-gray-600 italic">Preview applies here...</div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
