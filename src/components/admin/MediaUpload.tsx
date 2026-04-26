"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Loader2, Image as ImageIcon, FileText, Film, AlertCircle, Star } from "lucide-react";
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
  const [isUploadingGlobal, setIsUploadingGlobal] = useState(false);
  const [assets, setAssets] = useState<{url: string, id: string, isOptimistic?: boolean, progress?: number, type: 'image' | 'video' | 'other', isStarred: boolean}[]>(() => {
    if (!defaultValue) return [];
    try {
      const parsed = JSON.parse(defaultValue);
      
      // Handle array of strings or array of objects
      if (Array.isArray(parsed)) {
        return parsed.map((item: any, idx: number) => {
          if (typeof item === 'string') {
            return { 
              url: item, 
              id: Math.random().toString(36).substring(7), 
              progress: 100,
              type: item.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image',
              isStarred: idx === 0
            };
          }
          return {
            ...item,
            id: Math.random().toString(36).substring(7),
            progress: 100,
            type: item.type || (item.url.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image'),
            isStarred: !!item.isStarred
          };
        });
      }

      // Handle single string
      return [{ 
        url: defaultValue, 
        id: Math.random().toString(36).substring(7), 
        progress: 100,
        type: defaultValue.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image',
        isStarred: true
      }];
    } catch {
      return [{ 
        url: defaultValue, 
        id: Math.random().toString(36).substring(7), 
        progress: 100,
        type: defaultValue.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image',
        isStarred: true
      }];
    }
  });

  useEffect(() => {
    onUploadingChange?.(isUploadingGlobal);
  }, [isUploadingGlobal, onUploadingChange]);

  const toggleStar = (id: string) => {
    setAssets(prev => prev.map(a => ({
      ...a,
      isStarred: a.id === id ? !a.isStarred : false
    })));
  };

  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  // Optimized detection using file info
  const getFileType = (file: File | string): 'image' | 'video' | 'other' => {
    if (typeof file === 'string') {
      if (file.match(/\.(mp4|webm|ogg|mov)$/i)) return 'video';
      if (file.includes('youtube.com') || file.includes('youtu.be') || file.includes('drive.google.com')) return 'video';
      if (file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
      return 'other';
    }
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'other';
  };

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) return resolve(file);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          
          // Target size: < 5MB
          // If original is huge, we scale down resolution significantly
          let quality = 0.8;
          let scale = 1;
          
          if (file.size > 10 * 1024 * 1024) { // > 10MB
            scale = 0.5; // Half the resolution
            quality = 0.6;
          } else if (file.size > 5 * 1024 * 1024) { // > 5MB
            scale = 0.7;
            quality = 0.7;
          }

          let width = img.width * scale;
          let height = img.height * scale;

          // Absolute max resolution for web
          const MAX_RES = 1600;
          if (width > MAX_RES || height > MAX_RES) {
            const ratio = Math.min(MAX_RES / width, MAX_RES / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                console.log(`Compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            quality
          );
        };
      };
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const fileList = Array.from(files);
      
      // Check for large videos before starting
      for (const file of fileList) {
        if (file.type.startsWith('video/') && file.size > 50 * 1024 * 1024) {
          throw new Error(`Video "${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max limit is 50MB. Please compress it before uploading.`);
        }
      }

      setIsUploadingGlobal(true);
      
      const newUploads = fileList.map(file => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file), 
        isOptimistic: true,
        progress: 5,
        type: getFileType(file),
        isStarred: assets.length === 0 && !multiple,
        file
      }));

      if (multiple) {
        setAssets(prev => [...prev, ...newUploads]);
      } else {
        setAssets(newUploads);
      }

      const uploadPromises = newUploads.map(async (item) => {
        let fileToUpload = item.file;
        
        // Compression for images
        if (item.type === 'image') {
          fileToUpload = await compressImage(item.file);
        }

        const fileExt = fileToUpload.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Simulated progress for better UX
        const interval = setInterval(() => {
          setAssets(prev => prev.map(a => {
            if (a.id === item.id && a.isOptimistic && (a.progress || 0) < 95) {
              // Slower progress as it gets higher to feel more realistic
              const increment = (a.progress || 0) > 80 ? 1 : 3;
              return { ...a, progress: (a.progress || 0) + increment };
            }
            return a;
          }));
        }, 300);

        // ACTUAL UPLOAD
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, fileToUpload, {
            cacheControl: '3600',
            upsert: false,
            contentType: fileToUpload.type // CRITICAL for videos
          });

        clearInterval(interval);

        if (uploadError) {
          // Remove the failed asset from state
          setAssets(prev => prev.filter(a => a.id !== item.id));
          throw uploadError;
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        
        setAssets(prev => prev.map(a => a.id === item.id ? { 
          ...a, 
          url: data.publicUrl, 
          isOptimistic: false, 
          progress: 100,
          type: getFileType(data.publicUrl)
        } : a));

        URL.revokeObjectURL(item.url);
        return data.publicUrl;
      });

      await Promise.all(uploadPromises);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(`Upload failed: ${err.message || "Unknown error"}. Check if file size is too large.`);
    } finally {
      setIsUploadingGlobal(false);
      e.target.value = "";
    }
  };

  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkInput, setLinkInput] = useState("");

  const handleAddLink = () => {
    if (!linkInput) return;
    
    // Simple validation
    if (!linkInput.startsWith('http')) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    const newAsset = {
      id: Math.random().toString(36).substring(7),
      url: linkInput,
      isOptimistic: false,
      progress: 100,
      type: getFileType(linkInput),
      isStarred: assets.length === 0 && !multiple
    };

    if (multiple) {
      setAssets(prev => [...prev, newAsset]);
    } else {
      setAssets([newAsset]);
    }

    setLinkInput("");
    setIsAddingLink(false);
    setError(null);
  };

  const removeAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const finalMedia = assets.filter(a => !a.isOptimistic).map(a => ({
    url: a.url,
    type: a.type,
    isStarred: a.isStarred
  }));

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-cyan-500" /> {label} {multiple && <span className="text-[10px] text-slate-600 font-normal">(Multiple allowed)</span>}
      </label>
      
      <input type="hidden" name={name} value={multiple ? JSON.stringify(finalMedia) : (finalMedia[0]?.url || "")} />

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-3 mb-4"
        >
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-400 font-medium">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {/* Preview List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {assets.map((asset) => (
            <motion.div 
              key={asset.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative bg-slate-900/50 border ${asset.isOptimistic ? 'border-cyan-500/50' : 'border-white/10'} rounded-xl p-3 flex items-center justify-between min-w-0 group`}
            >
              <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1 mr-4">
                {asset.type === 'image' ? (
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                    <img src={asset.url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : asset.type === 'video' ? (
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-800 relative">
                    <video src={asset.url} className="w-full h-full object-cover" muted />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <Film className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-[10px] truncate block font-bold ${asset.isOptimistic ? 'text-slate-400' : 'text-cyan-400'}`}>
                      {asset.isOptimistic ? `Uploading ${asset.type}...` : asset.url.split('/').pop()}
                    </span>
                    {asset.isOptimistic && (
                      <span className="text-[10px] font-black text-cyan-500 tabular-nums">{asset.progress}%</span>
                    )}
                  </div>
                  {asset.isOptimistic && (
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "5%" }}
                        animate={{ width: `${asset.progress}%` }}
                        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!asset.isOptimistic && multiple && (
                  <button
                    type="button"
                    onClick={() => toggleStar(asset.id)}
                    className={`p-1.5 rounded-lg transition-all ${
                      asset.isStarred 
                        ? 'bg-yellow-500/20 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]' 
                        : 'text-slate-500 hover:text-yellow-500 bg-slate-800/50 hover:bg-yellow-500/10'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${asset.isStarred ? 'fill-yellow-500' : ''}`} />
                  </button>
                )}
                {!asset.isOptimistic && (
                  <button
                    type="button"
                    onClick={() => removeAsset(asset.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800/50 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Area */}
        <div className="space-y-3">
          {isAddingLink ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-cyan-500/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Loader2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Paste External Link</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or Google Drive Link"
                  className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none transition-all"
                />
                <button 
                  onClick={handleAddLink}
                  type="button"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  Add
                </button>
                <button 
                  onClick={() => setIsAddingLink(false)}
                  type="button"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  Cancel
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Perfect for large videos (&gt;50MB) from YouTube, Drive, or Cloudinary.</p>
            </motion.div>
          ) : (
            <div className="flex gap-3">
              {(multiple || assets.length === 0) && (
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept={accept}
                    onChange={handleUpload}
                    disabled={isUploadingGlobal}
                    multiple={multiple}
                    className="hidden"
                  />
                  <div className={`w-full h-full bg-slate-900/50 border border-dashed border-white/20 rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-2 transition-all hover:bg-slate-900/80 hover:border-cyan-500/50 ${isUploadingGlobal ? 'bg-slate-900/80 border-cyan-500/20' : ''}`}>
                    <Upload className={`w-5 h-5 ${isUploadingGlobal ? 'text-cyan-400 animate-spin' : 'text-slate-400'}`} />
                    <span className="text-[11px] font-bold text-slate-400">{isUploadingGlobal ? "Uploading..." : "Upload File"}</span>
                  </div>
                </label>
              )}
              
              {(multiple || assets.length === 0) && (
                <button
                  type="button"
                  onClick={() => setIsAddingLink(true)}
                  className="flex-1 bg-slate-900/50 border border-dashed border-white/20 rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-2 transition-all hover:bg-slate-900/80 hover:border-cyan-500/50 group"
                >
                  <Loader2 className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-cyan-400">Add via Link</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
