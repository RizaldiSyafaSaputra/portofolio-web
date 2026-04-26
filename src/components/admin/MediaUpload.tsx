"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MediaUploadProps {
  label: string;
  name: string;
  defaultValue?: string | null;
  accept?: string;
  bucket?: string;
  icon?: any;
}

export function MediaUpload({ 
  label, 
  name, 
  defaultValue, 
  accept = "image/*", 
  bucket = "media",
  icon: Icon = ImageIcon 
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState<string>(defaultValue || "");
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      setUrl(data.publicUrl);
    } catch (err: any) {
      setError(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-cyan-500" /> {label}
      </label>
      
      <input type="hidden" name={name} value={url} />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="relative group flex items-center gap-4">
        {url ? (
          <div className="relative flex-1 bg-slate-900/50 border border-white/10 rounded-xl p-3 flex items-center justify-between min-w-0">
            <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1 mr-4">
              {accept.includes("image") ? (
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                  <img src={url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
              )}
              <a href={url} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline truncate block w-full">
                {url}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setUrl("")}
              className="p-2 text-slate-400 hover:text-red-400 bg-slate-800/50 hover:bg-red-500/10 rounded-lg transition-all shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex-1 cursor-pointer">
            <input
              type="file"
              accept={accept}
              onChange={handleUpload}
              disabled={isUploading}
              className="hidden"
            />
            <div className={`w-full bg-slate-900/50 border border-dashed border-white/20 rounded-xl px-4 py-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-slate-900/80 hover:border-cyan-500/50 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isUploading ? (
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              ) : (
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              )}
              <span className="text-xs text-slate-400">
                {isUploading ? "Uploading..." : `Click to upload ${accept.includes("image") ? "an image" : "a file"}`}
              </span>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}
