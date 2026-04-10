"use client";

import React, { useState } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";

interface ImageDropzoneProps {
  onUpload: (url: string) => void;
  defaultImage?: string;
}

export default function ImageDropzone({ onUpload, defaultImage }: ImageDropzoneProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [preview, setPreview] = useState(defaultImage || "");

  // Simulated upload behavior since we don't have S3 wired yet
  const simulateUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    // In production, we upload `file` to /api/upload and get S3 URL back
    onUpload(objectUrl);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setPreview("");
    onUpload("");
  };

  if (preview) {
    return (
      <div className="relative w-full h-64 rounded-xl border border-white/10 overflow-hidden group">
        <img src={preview} alt="Upload Preview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <button 
            type="button"
            onClick={removeImage}
            className="p-3 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
      onDragLeave={() => setIsHovering(false)}
      onDrop={onDrop}
      className={`w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
        isHovering ? "border-purple-500 bg-purple-500/5 text-purple-400" : "border-white/20 bg-white/5 text-gray-400 hover:border-white/40 hover:bg-white/10"
      }`}
    >
      <input type="file" accept="image/*" className="hidden" id="file-upload" onChange={onFileSelect} />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
        <UploadCloud size={48} className="mb-4 opacity-50" />
        <h3 className="text-lg font-medium text-white mb-1">Drag & drop cover image</h3>
        <p className="text-sm">Or click to browse files</p>
      </label>
    </div>
  );
}
