import React, { useEffect, useRef, useState } from "react";
import { Config, AllSettings, PixelStreaming } from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.3";

export interface PixelStreamingWrapperProps {
    initialSettings?: Partial<AllSettings>;
}

export const PixelStreamingWrapper2 = ({ initialSettings }: PixelStreamingWrapperProps) => {
    const videoParent = useRef<HTMLDivElement>(null);
    const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>();
    const [clickToPlayVisible, setClickToPlayVisible] = useState(true);

    useEffect(() => {
        if (videoParent.current) {
            console.log("📌 Video Parent Element Found:", videoParent.current);
    
            const config = new Config({ initialSettings });
            const streaming = new PixelStreaming(config, {
                videoElementParent: videoParent.current
            });
    
            streaming.addEventListener("webRtcConnected", () => {
                console.log("✅ WebRTC Connected: Video should appear!");
                
                setTimeout(() => {
                    const video = videoParent.current?.querySelector("video");
                    if (video) {
                        console.log("🎥 Video Element Found:", video);
                    } else {
                        console.error("❌ No video element found!");
                    }
                }, 3000);
            });
    
            setPixelStreaming(streaming);
    
            return () => {
                try {
                    streaming.disconnect();
                } catch {}
            };
        }
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div style={{ width: "100%", height: "100%" }} ref={videoParent} />
            {clickToPlayVisible && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        fontSize: "20px",
                    }}
                    onClick={() => {
                        console.log("🔄 Clicked to play video!");
                        pixelStreaming?.play();
                        setClickToPlayVisible(false);
                    }}
                >
                    <div>Click to play</div>
                </div>
            )}
        </div>
    );
};