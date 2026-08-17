import React, { useState } from "react";
import { Video } from "../types";
import { ThumbsUp, Share2, Eye, Calendar, ArrowLeft, RefreshCw, CheckCircle, ExternalLink, X, Youtube } from "lucide-react";
import AdBanner from "./AdBanner";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface VideoDetailViewProps {
  video: Video;
  relatedVideos: Video[];
  onBack: () => void;
  onSelectVideo: (video: Video) => void;
}

export default function VideoDetailView({ video, relatedVideos, onBack, onSelectVideo }: VideoDetailViewProps) {
  const [shareCopied, setShareCopied] = useState(false);
  const [showAd, setShowAd] = useState(true);

  // Extract standard YouTube ID
  const getYouTubeId = (url: string) => {
    if (!url) return "";
    let videoId = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      videoId = match[2];
    } else {
      const trimmed = url.trim();
      if (trimmed.length === 11) {
        videoId = trimmed;
      }
    }
    return videoId;
  };

  const ytId = getYouTubeId(video.videoUrl);

  const handleShare = () => {
    const appUrl = window.location.href;
    navigator.clipboard.writeText(appUrl).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }).catch((err) => {
      console.error("Failed to copy URL:", err);
    });
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("/embed/")) {
      return url;
    }
    return ytId ? `https://www.youtube.com/embed/${ytId}` : url;
  };

  const renderDescriptionWithLinks = (text: string) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline font-semibold break-all inline-flex items-center gap-0.5"
          >
            {part.length > 40 ? part.substring(0, 37) + "..." : part}
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full max-w-full">
      
      {/* Back button */}
      <button 
        id="btn-back-to-list"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold font-sans text-sm mb-6 transition-all group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Video Gallery</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Player & Details */}
        <div className="lg:col-span-2">
          
          {/* Custom Video Player Wrapper */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 shadow-md">
            <iframe
              id="active-video-iframe"
              src={getEmbedUrl(video.videoUrl)}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            {/* Opaque Advertisement Panel at bottom of video player */}
            {showAd && (
              <div className="absolute inset-x-0 bottom-0 bg-slate-950/90 backdrop-blur-md text-white py-1 px-2 border-t border-white/10 shadow-2xl animate-fade-in flex flex-col items-center justify-center z-10">
                {/* Close Button positioned at Top Right */}
                <div className="w-full flex items-center justify-end px-1">
                  <button
                    onClick={() => setShowAd(false)}
                    className="text-slate-400 hover:text-white p-0.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    title="Close Advertisement"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Centered Ad Frame matching 728x90 leaderboard spec */}
                <div className="w-full flex items-center justify-center overflow-hidden py-0.5">
                  <div className="relative w-full max-w-[728px] aspect-[728/90] flex items-center justify-center overflow-hidden">
                    <div className="absolute w-[728px] h-[90px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center transform scale-[0.38] min-[400px]:scale-[0.5] sm:scale-[0.72] md:scale-[0.85] lg:scale-100 flex items-center justify-center">
                      <iframe
                        key={`video-player-ad-${video.id}`}
                        title="Video Player Advertisement"
                        srcDoc={`
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <meta charset="utf-8">
                              <style>
                                body { 
                                  margin: 0; 
                                  padding: 0; 
                                  display: flex; 
                                  justify-content: center; 
                                  align-items: center; 
                                  background-color: transparent; 
                                  height: 100vh;
                                  overflow: hidden;
                                }
                              </style>
                            </head>
                            <body>
                              <script type="text/javascript">
                                atOptions = {
                                  'key' : 'b1acc870567da6b24d85437a412a430f',
                                  'format' : 'iframe',
                                  'height' : 90,
                                  'width' : 728,
                                  'params' : {}
                                };
                              </script>
                              <script type="text/javascript" src="https://www.highperformanceformat.com/b1acc870567da6b24d85437a412a430f/invoke.js"></script>
                            </body>
                          </html>
                        `}
                        width="728"
                        height="90"
                        scrolling="no"
                        frameBorder="0"
                        style={{ border: "none", overflow: "hidden", display: "block" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Float share button inside the player at bottom-left */}
            <button
              id="float-share-video"
              onClick={handleShare}
              className={`absolute left-4 bottom-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg backdrop-blur-md border cursor-pointer transition-all active:scale-95 ${
                shareCopied 
                  ? "bg-emerald-500 border-emerald-500 text-white" 
                  : "bg-slate-900/90 hover:bg-slate-800/90 border-white/20 text-[#1877F2]"
              }`}
              title="Share current app page link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareCopied ? "Link Copied!" : "Share Link"}</span>
            </button>
          </div>

          {/* Top Advertisement Banner right after the Video Player */}
          <div id="video-detail-top-ad" className="mt-4 mb-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs p-1">
            <AdBanner reloadKey={`video-detail-${video.id}`} />
          </div>

          {/* Personal Advertisement OwnCircles Dev Panel */}
          <div id="video-detail-owncircles-ad" className="my-2">
            <OwnCirclesAnnouncement mode="mobile" />
          </div>

          {/* Title & Actions bar */}
          <div className="mt-5 border-b border-green-50 pb-6">
            <div className="flex gap-2 mb-3">
              {video.type === "own" || (video.creator || "").toLowerCase().includes("modern fisheries") ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-600 text-white">
                  Modern Fisheries
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-red-600 text-white flex items-center gap-1">
                  <Youtube className="w-3 h-3" />
                  <span>{video.creator || "YouTube Channel"}</span>
                </span>
              )}
              {video.category && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-800 border border-green-100/50">
                  {video.category}
                </span>
              )}
            </div>

            <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
              {video.title}
            </h1>

            {/* Video Meta & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Published {video.publishDate}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  id="badge-likes-video"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-600 select-none"
                  title="Likes count"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                  <span>{video.likes ? video.likes.toLocaleString() : 0} Likes</span>
                </div>

                <button
                  id="btn-share-video"
                  onClick={handleShare}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                    shareCopied 
                      ? "bg-emerald-500 border-emerald-500 text-white" 
                      : "bg-white hover:bg-slate-50 border-slate-200 text-[#1877F2]"
                  }`}
                  title="Share current app page link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shareCopied ? "Link Copied!" : "Share Link"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description & Channel Bio */}
          <div className="mt-6 border-b border-green-50 pb-6">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-extrabold text-sm border-2 border-green-50 shrink-0">
                {(video.creator || "Modern Fisheries").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  {video.creator || "Modern Fisheries"}
                  <CheckCircle className="w-4 h-4 text-green-500 fill-current" />
                </h3>
                <p className="text-slate-500 text-[11px] font-mono">
                  {video.type === "own" || (video.creator || "").toLowerCase().includes("modern fisheries") ? "Official Channel" : "YouTube Creator"}
                </p>
              </div>
            </div>

            <p className="font-sans text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {renderDescriptionWithLinks(video.description)}
            </p>
          </div>

        </div>

        {/* Right 1 Col: Related Videos Sidebar */}
        <div>
          <h3 className="font-sans font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-green-600" />
            <span>Recommended Videos</span>
          </h3>

          <div className="space-y-4">
            {relatedVideos.map((item) => {
              const itemCreator = item.creator || "Modern Fisheries";
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectVideo(item)}
                  className="group flex gap-3 p-2 bg-white rounded-xl border border-green-50 hover:border-green-200/80 cursor-pointer shadow-xs hover:shadow-sm transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded-sm text-[9px] font-mono bg-slate-950/80 text-white font-semibold">
                      {item.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                    <div>
                      <h4 className="font-sans font-semibold text-slate-900 group-hover:text-green-700 text-xs leading-snug line-clamp-2 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-sans mt-0.5 block truncate">{itemCreator}</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                      <span>{item.views}</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-slate-100 text-slate-700 truncate max-w-[90px]">
                        {itemCreator}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
