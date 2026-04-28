"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Loader2, Image as ImageIcon, FileText, Film, AlertCircle, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MediaUploadProps {
  label: string;
  name: string;
  defaultValue?: string | null;
  accept?: string;
  bucket?: string;
  icon?: any;
  multiple?: boolean;
  onUploadingChange?: (isUploading: boolean) => void;
}

export function MediaUpload({ 
  label, 
  name, 
  defaultValue, 
  accept = "image/*,video/*", 
  bucket = "media",
  icon: Icon = ImageIcon,
  multiple = false,
  onUploadingChange
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [asset, setAsset] = useState<string | null>(defaultValue || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  useEffect(() => {
    if (asset) {
      // Try to extract a readable filename from the URL
      try {
        const url = new URL(asset);
        const name = url.pathname.split('/').pop() || "Uploaded File";
        setFileName(decodeURIComponent(name));
      } catch {
        setFileName("Uploaded File");
      }
    }
  }, [asset]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state
    setError(null);
    setIsUploading(true);
    setFileName(file.name);

    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const cleanName = file.name.split('.')[0].replace(/[^a-z0-9]/gi, '-').toLowerCase();
      const fileNameToUpload = `${cleanName}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `${fileNameToUpload}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setAsset(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeAsset = () => {
    setAsset(null);
    setError(null);
    setFileName(null);
  };

  const isVideo = asset?.match(/\.(mp4|webm|ogg|mov)$/i);
  const isPDF = asset?.match(/\.pdf$/i) || asset?.includes('application/pdf');

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-cyan-500" /> {label}
      </label>

      <input 
        type="hidden" 
        name={name} 
        value={asset || ""} 
      />

      <div className="relative group">
        {!asset ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative h-32 w-full rounded-2xl border-2 border-dashed 
              transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2
              ${isUploading ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/10 hover:border-cyan-500/40 hover:bg-white/5'}
            `}
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            )}
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {isUploading ? 'Uploading...' : 'Upload Media'}
            </span>
          </div>
        ) : (
          <div className={`relative rounded-2xl overflow-hidden border border-white/10 ${isPDF ? 'h-24' : 'aspect-video'} bg-neutral-950 group/asset flex items-center justify-center`}>
            {isPDF ? (
              <div className="flex items-center gap-4 px-6 w-full">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                  <FileText className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PDF Document</span>
                  <span className="text-sm font-bold text-white truncate">{fileName}</span>
                </div>
              </div>
            ) : isVideo ? (
              <video src={asset} className="w-full h-full object-cover" />
            ) : (
              <img src={asset} alt="Uploaded" className="w-full h-full object-contain" />
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/asset:opacity-100 transition-all flex items-center justify-center gap-2">
              <a 
                href={asset} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-cyan-500 transition-all"
                title="Preview File"
              >
                <Eye className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={removeAsset}
                className="p-2.5 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-red-500 transition-all"
                title="Delete File"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept={accept}
          className="hidden"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-wider mt-1 px-2">
          <AlertCircle className="w-3 h-3" /> {error}
        </div>
      )}
    </div>
  );
}
