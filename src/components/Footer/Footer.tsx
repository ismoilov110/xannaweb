import { cn } from "@/lib/utils";
import { styles } from "@/Styles/Styles";
import { Heart, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative z-30 bg-gradient-to-b from-[#FFF1F2] to-[#FDE2E8]">
            {/* Background */}
            <div className="absolute inset-0 gradient-hero opacity-50"></div>

            {/* Content */}
            <div className={`${styles.container} relative z-10 py-16`}>
                <div className="flex flex-col items-center space-y-8">
                    {/* Logo */}
                    <span className="font-serif text-2xl font-semibold mb-1 tracking-tight text-[#3A2B2F]">
                        LookMe
                    </span>
                    <span className="text-sm text-[#8C6F76] font-sans ">
                        by XANNA
                    </span>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center mt-3 space-x-4">
                    <Link className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFFFF] shodow-md border border-border/50 text-[#8C6F76] hover:text-[#F28BA8] hover:shadow-md hover:-translate-y-1 transition-all durtion-300" to={"https://www.instagram.com/lookmebyxanna?igsh=amVocHY4YmVzYmdx"}>
                        <Instagram className={cn("h-5 w-5")} />
                    </Link>
                    <Link className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFFFF] shodow-md border border-border/50 text-[#8C6F76] hover:text-[#F28BA8] hover:shadow-md hover:-translate-y-1 transition-all durtion-300" to={"https://instagram.com"}>
                        <Youtube className={cn("h-5 w-5")} />
                    </Link>
                </div>

                {/* Links */}
                <div className="flex flex-wrap mt-4 justify-center gap-6 text-sm text-[#8C6F76] ">
                    <Link to={"/privacy"} className={cn("hover:text-[#F28BA8] transition-colors")}>
                        Maxfiylik siyosati
                    </Link>
                    <Link to={"/terms"} className={cn("hover:text-[#F28BA8] transition-colors")}>
                        Foydalanish shartlari
                    </Link>
                    <Link to={"/contact"} className={cn("hover:text-[#F28BA8] transition-colors")}>
                        Bog'lanish
                    </Link>
                </div>

                {/* CopyRight */}
                <div className="flex items-center justify-center mt-4 space-x-1 text-sm text-[#8C6F76]">
                    <span>© 2026 LOOKME. Barcha huquqlar himoyalangan</span>
                    <Heart className={cn("h-3 w-3 text-[#F28BA8] fill-[#F28BA8]")} />
                </div>
            </div>
        </footer>
    );
}
