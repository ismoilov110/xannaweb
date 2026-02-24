import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Send,
  Instagram,
  Youtube,
  Play,
  Image as ImageIcon,
  AlertCircle,
  RefreshCcw,
  LayoutGrid
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// TypeScript Type
type ContentItem = {
  id: number;
  title: string;
  description: string;
  media_url: string;
  media_type: "video" | "image";
  telegram_link?: string | null;
  instagram_link?: string | null;
  youtube_link?: string | null;
  created_at: string;
  created_display: string;
};

const Contack: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://xannaofficial.uz/kontent/");
      setContents(response.data);
    } catch (err: any) {
      console.error("Fetch contents error:", err);
      setError("Xatolik yuz berdi, qayta urinib ko'ring");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const renderMedia = (item: ContentItem) => {
    if (item.media_type === "video") {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-black">
          <video
            src={item.media_url}
            className="h-full w-full object-cover"
            controls
            preload="metadata"
            poster={item.media_url + "#t=0.5"}
          />
          <div className="absolute top-2 right-2 pointer-events-none">
            <Badge className="bg-white/90 text-[#F98CA1] hover:bg-white border-none shadow-sm gap-1 uppercase">
              <Play className="w-3 h-3 fill-current" />
              Video
            </Badge>
          </div>
        </div>
      );
    }
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-gray-100">
        <img
          src={item.media_url}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 pointer-events-none">
          <Badge className="bg-white/90 text-[#F98CA1] hover:bg-white border-none shadow-sm gap-1 uppercase">
            <ImageIcon className="w-3 h-3" />
            Image
          </Badge>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{error}</h3>
          <p className="text-gray-500 mt-1">Internet aloqasini tekshiring yoki serverda muammo bo'lishi mumkin</p>
        </div>
        <Button
          onClick={fetchContents}
          className="bg-[#F98CA1] hover:bg-[#ff7b94] text-white gap-2 px-8"
        >
          <RefreshCcw className="w-4 h-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!loading && contents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4 text-center">
        <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-[#F98CA1]">
          <LayoutGrid className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Hozircha kontent yo'q</h3>
          <p className="text-gray-500 mt-1">Yaqin orada yangi kontentlar paydo bo'ladi ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#4A2C2C] mb-8 md:mb-12">
        Kontentlar
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {loading ? (
          // Skeleton Loading
          Array.from({ length: 6 }).map((_, idx) => (
            <Card key={idx} className="overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
              <Skeleton className="aspect-video w-full rounded-none" />
              <CardContent className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="p-5 pt-0 flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </CardFooter>
            </Card>
          ))
        ) : (
          // Content List
          contents.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-none bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(249,140,161,0.2)] transition-all duration-300 rounded-2xl flex flex-col h-full"
            >
              {renderMedia(item)}

              <CardContent className="flex-grow p-5">
                <h3 className="text-xl font-bold text-[#4A2C2C] mb-2 line-clamp-1 group-hover:text-[#F98CA1] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#8B5E5E] text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  {item.created_display}
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex gap-3 border-t border-gray-50 mt-auto">
                <SocialButton
                  href={item.telegram_link}
                  icon={<Send className="w-5 h-5" />}
                  label="Telegram"
                />
                <SocialButton
                  href={item.instagram_link}
                  icon={<Instagram className="w-5 h-5" />}
                  label="Instagram"
                />
                <SocialButton
                  href={item.youtube_link}
                  icon={<Youtube className="w-5 h-5" />}
                  label="YouTube"
                />
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

interface SocialButtonProps {
  href?: string | null;
  icon: React.ReactNode;
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ href, icon, label }) => {
  const disabled = !href || href === "#" || href === "";

  return (
    <a
      href={disabled ? undefined : href}
      target="_blank"
      rel="noreferrer"
      className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${disabled
          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
          : "bg-[#FFF0F5] text-[#F98CA1] hover:bg-[#F98CA1] hover:text-white hover:scale-110 active:scale-95 shadow-sm"
        }
            `}
      title={label}
      onClick={(e) => disabled && e.preventDefault()}
    >
      {icon}
    </a>
  );
};

export default Contack;
