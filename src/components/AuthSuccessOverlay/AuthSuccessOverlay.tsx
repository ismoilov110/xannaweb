import { Check } from "lucide-react";
import { useEffect, useState } from "react";


type Props = {
    open: boolean;
    title?: string;
    subtitle?: string;
    durationMs?: number;
    onDone?: () => void;
}


export default function ({
    open,
    title = "Xush kelibsiz!",
    subtitle = "Tizimga muvaffaqiyatli kirdingiz",
    durationMs = 1200,
    onDone,
}: Props): React.ReactNode {
    const [visible, setVisible] = useState(open);

    useEffect(() => {
        if (open) {
            setVisible(false)
            return;
        }
        setVisible(true);

        const t = setTimeout(() => {
            onDone?.();

        }, durationMs);

        return () => window.clearTimeout(t)
    }, [open, durationMs, onDone]);
    if (!visible) return null;



    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#FDECEF]/70 backdrop-blur-sm">
                {/* Card */}
                <div className="relative w-[92%] max-w-md rounded-3xl bg-white/70 border border-[#F3D5DB] shadow-2xl px-8 py-10 text-center">
                    {/* Glow ring */}
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#FDECEF]/20">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#F98CA1]/30">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center  bg-[#F98CA1] text-white shadow">
                                <Check className="w-5 h-5" strokeWidth={3} />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-serif text-[#2E2E2E]">{title}</h2>
                    <p className="mt-2 text-sm text-[#9A7F85]">{subtitle}</p>


                    {/* dots */}
                    <div className="mt-5 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F98CA1]/40" />
                        <span className="w-2 h-2 rounded-full bg-[#F98CA1]/70" />
                        <span className="w-2 h-2 rounded-full bg-[#F98CA1]/40" />
                    </div>
                </div>
            </div>
        </div>
    )
}
