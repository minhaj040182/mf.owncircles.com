import React, { useEffect, useState } from "react";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface RightSidebarAdProps {
  /**
   * Unique trigger key to force the ad to reload when pages or routes switch.
   */
  reloadKey: string;
}

export default function RightSidebarAd({ reloadKey }: RightSidebarAdProps) {
  const [key, setKey] = useState(0);

  // Force re-rendering of the iframe whenever the reloadKey changes or every 65 seconds
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [reloadKey]);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 65000); // Reload every 65 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      id="right-advertisement-sidebar"
      className="hidden lg:flex w-full max-w-[240px] mx-auto min-h-[600px] p-2 bg-slate-50 border border-slate-200/60 rounded-2xl flex-col items-center justify-start gap-4 select-none sticky top-20 shadow-xs"
    >
      {/* Square Sliding Announcement Card on Top of Right Advertisement */}
      <div className="w-full transition-all duration-500 animate-in fade-in slide-in-from-right-4">
        <OwnCirclesAnnouncement mode="square" />
      </div>

      {/* Vertical Ad Container */}
      <div className="flex flex-col items-center justify-center w-full pt-1 border-t border-slate-200/60">
        {/* Skyscraper container matching 160x600 spec */}
        <div 
          id="ad-wrapper-160-600"
          className="w-[160px] h-[600px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-xs flex items-center justify-center transition-all hover:shadow-sm"
        >
          <iframe
            key={`${reloadKey}-${key}`}
            title="Vertical Advertisement"
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
                      'key' : '69ea665a78295a445a46c9ef5ecdd0c8',
                      'format' : 'iframe',
                      'height' : 600,
                      'width' : 160,
                      'params' : {}
                    };
                  </script>
                  <script type="text/javascript" src="https://www.highperformanceformat.com/69ea665a78295a445a46c9ef5ecdd0c8/invoke.js"></script>
                </body>
              </html>
            `}
            width="160"
            height="600"
            scrolling="no"
            frameBorder="0"
            style={{ border: "none", overflow: "hidden", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

