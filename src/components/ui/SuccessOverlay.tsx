import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessOverlayProps {
    open: boolean
    onDone?: () => void
}

export default function SuccessOverlay({ open, onDone }: SuccessOverlayProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isRendered, setIsRendered] = useState(false)

    useEffect(() => {
        if (open) {
            setIsRendered(true)
            document.body.style.overflow = "hidden"

            // Kichik timeout animatsiya ishlashi uchun
            const enterTimer = setTimeout(() => {
                setIsVisible(true)
            }, 10)

            // 1.2 soniyadan keyin yopish
            const exitTimer = setTimeout(() => {
                setIsVisible(false)

                // Animatsiya tugashini kutib onDone ni chaqirish
                setTimeout(() => {
                    onDone?.()
                    // Eslatma: onDone odatda navigatsiya qiladi, shuning uchun
                    // bu yerdagi cleanup muhim emas, lekin xavfsizlik uchun:
                    document.body.style.overflow = "auto"
                    setIsRendered(false)
                }, 300) // transition-duration bilan bir xil bo'lishi kerak
            }, 1200)

            return () => {
                clearTimeout(enterTimer)
                clearTimeout(exitTimer)
                document.body.style.overflow = "auto"
            }
        }
    }, [open, onDone])

    if (!open && !isRendered) return null

    return createPortal(
        <div className={cn(
            "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out",
            isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#FDECEF]/70 backdrop-blur-sm" />

            {/* Card */}
            <div className={cn(
                "relative transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "flex flex-col items-center justify-center px-10 py-8",
                "rounded-3xl bg-white/70 border border-[#F3D5DB] shadow-2xl",
                isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            )}>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfdf5] mb-4 shadow-sm border border-[#dcfce7]">
                    <Check className="h-8 w-8 text-[#10b981]" strokeWidth={3} />
                </div>
                <h2 className="text-xl font-medium text-[#2E2E2E]">Muvaffaqiyatli!</h2>
            </div>
        </div>,
        document.body
    )
}
