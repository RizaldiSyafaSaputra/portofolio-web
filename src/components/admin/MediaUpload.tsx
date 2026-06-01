"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, Image as ImageIcon, FileText, Film, AlertCircle, Eye, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MediaItem {
  url: string;
  type: "image" | "video";
  isStarred?: boolean;
}

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
  multiple = true, // Default to true as per project requirements
  onUploadingChange
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [assets, setAssets] = useState<MediaItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse default value on mount/change
  useEffect(() => {
    if (defaultValue) {
      try {
        const parsed = JSON.parse(defaultValue);
        if (Array.isArray(parsed)) {
          setAssets(parsed.map(item => {
            if (typeof item === 'string') {
              return { 
                url: item, 
                type: item.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image', 
                isStarred: false 
              };
            }
            return item;
          }));
        } else {
          setAssets([{ 
            url: defaultValue, 
            type: defaultValue.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image', 
            isStarred: true 
          }]);
        }
      } catch {
        // Fallback if it's not a JSON string
        setAssets([{ 
          url: defaultValue, 
          type: defaultValue.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image', 
          isStarred: true 
        }]);
      }
    } else {
      setAssets([]);
    }
  }, [defaultValue]);

  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setIsUploading(true);

    try {
      const supabase = createClient();
      const uploadedItems: MediaItem[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
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

        const isVideoType = file.type.startsWith('video/') || !!file.name.match(/\.(mp4|webm|ogg|mov)$/i);
        uploadedItems.push({
          url: publicUrl,
          type: isVideoType ? 'video' : 'image',
          isStarred: false
        });
      }

      setAssets(prev => {
        const combined = [...prev, ...uploadedItems];
        // Ensure at least one item is starred if assets exist
        if (combined.length > 0 && !combined.some(item => item.isStarred)) {
          combined[0].isStarred = true;
        }
        return combined;
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload one or more files");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeAsset = (indexToRemove: number) => {
    setAssets(prev => {
      const filtered = prev.filter((_, idx) => idx !== indexToRemove);
      // If we removed the starred item, star the first remaining one
      if (prev[indexToRemove]?.isStarred && filtered.length > 0) {
        filtered[0].isStarred = true;
      }
      return filtered;
    });
  };

  const toggleStar = (indexToStar: number) => {
    setAssets(prev => 
      prev.map((item, idx) => ({
        ...item,
        isStarred: idx === indexToStar
      }))
    );
  };

  // Starred items go first in the JSON array to be used as main cover
  const serializedValue = assets.length > 0 
    ? JSON.stringify([...assets].sort((a, b) => (b.isStarred ? 1 : 0) - (a.isStarred ? 1 : 0))) 
    : "";

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-cyan-500" /> {label}
        </span>
        {assets.length > 0 && (
          <span className="text-[10px] text-cyan-400 font-bold normal-case">
            {assets.length} file(s) uploaded
          </span>
        )}
      </label>

      {/* Hidden input to store JSON string of files */}
      <input 
        type="hidden" 
        name={name} 
        value={serializedValue} 
      />

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {assets.map((item, idx) => {
            const isVideoItem = item.type === 'video' || item.url.match(/\.(mp4|webm|ogg|mov)$/i);
            
            return (
              <motion.div
                key={item.url + idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`relative rounded-2xl overflow-hidden border bg-neutral-950/80 aspect-square group/asset flex flex-col items-center justify-center transition-all ${
                  item.isStarred 
                    ? 'border-cyan-500/80 shadow-[0_0_15px_rgba(34,211,238,0.15)] bg-cyan-950/5' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {isVideoItem ? (
                  <div className="w-full h-full relative flex items-center justify-center bg-black">
                    <video src={item.url} className="w-full h-full object-cover opacity-80" muted playsInline />
                    <Film className="absolute w-8 h-8 text-white/40 pointer-events-none" />
                  </div>
                ) : (
                  <img src={item.url} alt="Uploaded" className="w-full h-full object-cover" />
                )}

                {/* Badges / Floating Indicators */}
                {item.isStarred && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-cyan-500 text-[8px] font-black uppercase tracking-wider rounded-md text-slate-950 flex items-center gap-1 z-10 shadow-lg">
                    <Star className="w-2.5 h-2.5 fill-current" /> Cover
                  </div>
                )}

                {/* Action Hover Controls */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/asset:opacity-100 transition-all flex items-center justify-center gap-2 z-20">
                  <button
                    type="button"
                    onClick={() => toggleStar(idx)}
                    className={`p-2 rounded-lg backdrop-blur-md transition-all shadow-md ${
                      item.isStarred 
                        ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-600' 
                        : 'bg-white/10 text-white hover:bg-cyan-500 hover:text-slate-950'
                    }`}
                    title={item.isStarred ? "Starred Cover Image" : "Set as Cover Image"}
                  >
                    <Star className={`w-3.5 h-3.5 ${item.isStarred ? 'fill-current' : ''}`} />
                  </button>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all shadow-md"
                    title="View Original"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => removeAsset(idx)}
                    className="p-2 bg-red-500/80 backdrop-blur-md text-white rounded-lg hover:bg-red-600 transition-all shadow-md"
                    title="Delete File"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Upload Button Box inside Grid */}
        {(multiple || assets.length === 0) && (
          <div 
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`
              relative aspect-square rounded-2xl border-2 border-dashed 
              transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2
              ${isUploading ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/10 hover:border-cyan-500/40 hover:bg-white/5'}
            `}
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            )}
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center px-2">
              {isUploading ? 'Uploading...' : 'Add Media'}
            </span>
          </div>
        )}
      </div>

      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-wider mt-1 px-2">
          <AlertCircle className="w-3 h-3" /> {error}
        </div>
      )}
    </div>
  );
}
