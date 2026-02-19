import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import video1 from "@/assets/videos/1.mp4";
import video2 from "@/assets/videos/2.mp4";
import video3 from "@/assets/videos/3.mp4";

const videos = [video1, video2, video3];

const SLIDE_MS = 8000; // 8s
const FADE_MS = 500;  // fade duration

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  // Slide interval (fade-out -> change index -> fade-in)
  useEffect(() => {
    const id = window.setInterval(() => {
      setIsFading(true);

      window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, Math.floor(FADE_MS * 0.9));
    }, SLIDE_MS);

    return () => window.clearInterval(id);
  }, []);

  // When index changes: play + fade-in
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = !soundOn;
    v.volume = 0.6;

    const playSafe = async () => {
      try {
        v.currentTime = 0;
        await v.play();
      } catch {
        // ignore autoplay errors
      } finally {
        setIsFading(false);
      }
    };

    playSafe();
  }, [currentIndex, soundOn]);

  const toggleSound = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      if (!soundOn) {
        v.muted = false;
        v.volume = 0.6;
        await v.play();
        setSoundOn(true);
      } else {
        v.muted = true;
        setSoundOn(false);
      }
    } catch {
      setSoundOn(false);
    }
  };

  const activeSrc = videos[currentIndex];

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-black">
      {/* ===== PREMIUM BACKGROUND (blurred) ===== */}
      <video
        key={`bg-${activeSrc}`}
        src={activeSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
      />

      {/* ===== MAIN VIDEO (face-safe) =====
          Mobile: object-contain to avoid cutting off content
      */}
      <video
        ref={videoRef}
        key={`main-${activeSrc}`}
        src={activeSrc}
        autoPlay
        muted={!soundOn}
        loop
        playsInline
        preload="metadata"
        className="
          absolute inset-0 w-full h-full
          object-contain md:object-cover
          md:object-[50%_38%]
          will-change-transform bg-top
        "
      />

      {/* Fade overlay (smooth transition) */}
      <div
        className={[
          "absolute inset-0 z-10 bg-black transition-opacity ease-out pointer-events-none",
          `duration-[${FADE_MS}ms]`,
          isFading ? "opacity-35" : "opacity-0",
        ].join(" ")}
      />

      {/* Gradient overlay - improved visibility */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Sound Toggle - positioned safely for mobile */}
      <button
        onClick={toggleSound}
        className="absolute top-24 right-4 z-40 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-4 md:py-2 text-white text-xs md:text-sm hover:bg-white/20 transition-all active:scale-95 flex items-center gap-2 max-w-[120px] md:max-w-none overflow-hidden"
      >
        <span>{soundOn ? "🔇" : "🔊"}</span>
        <span className="truncate">{soundOn ? "Ovoz o‘chirish" : "Ovoz yoqish"}</span>
      </button>

      {/* Content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 md:px-0 mt-10 md:mt-0">
        <div className="mb-4 md:mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/20 shadow-lg animate-fade-in-down">
          <span className="text-[#FDA4AF] text-xs md:text-base">✨</span>
          <span className="text-xs md:text-sm font-medium text-white/90 tracking-wide uppercase">
            XANNA bilan shaxsiy maslahatchi
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.2] tracking-tight drop-shadow-lg max-w-[90%] md:max-w-4xl mx-auto animate-fade-in-up">
          Ayollar uchun{" "}
          <span className="italic text-[#FDA4AF]">shaxsiy XANNA</span>
          <br className="hidden md:block" />
          {" "}maslahatchingiz
        </h1>

        <button
          onClick={() => navigate("/register")}
          className="group relative cursor-pointer px-8 py-3 md:px-10 md:py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-medium transition-all duration-300 hover:bg-white/30 border border-white/30 hover:border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden animate-fade-in-up delay-100"
        >
          <span className="relative z-10 text-base md:text-lg tracking-wide group-hover:tracking-wider transition-all duration-300">
            Boshlash
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
        </button>
      </div>
    </div>
  );
}
