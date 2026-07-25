import React, { useEffect, useState } from "react";

interface AdBannerProps {
  /**
   * Unique trigger key to force the ad to reload when pages or routes switch.
   */
  reloadKey: string;
}

export default function AdBanner({ reloadKey }: AdBannerProps) {
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
      id="advertisement-section"
      className="w-full py-0.5 bg-slate-50 flex flex-col items-center justify-center select-none"
    >
      {/* Centered isolated sandboxed container matching the 728x90 leaderboard spec */}
      <div 
        id="ad-wrapper-728-90"
        className="w-full max-w-full flex items-center justify-center overflow-hidden px-2"
      >
        <div className="relative w-full max-w-[728px] aspect-[728/90] flex items-center justify-center overflow-hidden rounded-md bg-slate-100 border border-slate-200 shadow-xs">
          <div className="absolute w-[728px] h-[90px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center transform scale-[0.42] min-[360px]:scale-[0.48] min-[420px]:scale-[0.58] sm:scale-[0.75] md:scale-[0.88] lg:scale-100 flex items-center justify-center">
            <iframe
              key={`${reloadKey}-${key}`}
              title="Advertisement"
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
  );
}


