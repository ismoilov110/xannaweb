import { styles } from "@/Styles/Styles";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react"


gsap.registerPlugin(ScrollTrigger) // bu yerda ScrollTriggerni ro'yxatga olish kerak, aks holda xatolik yuz beradi.


// ZigZagSection komponenti uchun props turlari
interface ZigZagSectionProps {
    image: string,
    title: string,
    description: string,
    imageLeft: boolean,
    index: number
}


export default function ZigZagsection({ image, title, description, imageLeft, index }: ZigZagSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null); // butun section uchun ref
    const imageRef = useRef<HTMLDivElement>(null);   // rasm uchun ref
    const textRef = useRef<HTMLDivElement>(null);    // matn uchun ref

    // GSAP animatsiyalarini sozlash uchun useEffect
    useEffect(() => {
        // Animatsiya uchun kontekst yaratish, bu ScrollTrigger bilan ishlashda muhim
        const ctx = gsap.context(() => {
            // ✅ YANGI: Mobile va desktop uchun turli harakat masofalari
            const isMobile = window.innerWidth < 1024; // lg breakpoint (Tailwind)
            const moveDistance = isMobile ? 30 : 80; // Mobile da 30px, desktop da 80px
            
            // Rasm va matnning harakat yo'nalishini aniqlash
            const imageDirection = imageLeft ? -moveDistance : moveDistance; // rasm uchun harakat yo'nalishi
            const textDirection = imageLeft ? moveDistance : -moveDistance;  // matn uchun harakat yo'nalishi

            // Rasm uchun animatsiya
            gsap.from(imageRef.current, {
                x: imageDirection, // rasmning boshlang'ich x pozitsiyasi
                opacity: 0,  // rasmning boshlang'ich opasitisi
                duration: 0.8, // animatsiya davomligi
                ease: "power3.out", // animatsiya easing funksiyasi, bu yerda "power3.out" bu nima qilib beradi animatsiyani yanada silliq va tabiiy qiladi
                // ScrollTrigger sozlamalari, bu animatsiya qachon boshlanishi va qanday harakatlanishini belgilaydi
                scrollTrigger: {
                    trigger: sectionRef.current, // animatsiya qaysi elementga bog'lanishini belgilaydi, bu yerda butun section elementi
                    start: "top 80%", // animatsiya qachon boshlanishi, bu yerda sectionning tepa qismi 80% ko'rinishga kelganda boshlanadi
                    toggleActions: "play none none none", // animatsiya qanday harakatlanishini belgilaydi, bu yerda "play none none none" bu animatsiyani faqat bir marta o'ynatadi va boshqa harakatlarni amalga oshirmaydi (masalan, qaytarish yoki to'xtatish)
                    invalidateOnRefresh: true, // ✅ YANGI: Resize yoki orientation o'zgarganda animatsiyani yangilash
                }
            })

            // Matn uchun animatsiya
            gsap.from(textRef.current, {
                x: textDirection,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.15, // matn animatsiyasi rasmdan biroz kechroq boshlanadi
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    invalidateOnRefresh: true, // ✅ YANGI: Resize yoki orientation o'zgarganda animatsiyani yangilash
                }
            })
        })

        // ✅ YANGI: Window resize bo'lganda ScrollTrigger ni yangilash
        const handleResize = () => {
            ScrollTrigger.refresh();
        }

        window.addEventListener('resize', handleResize);

        // Cleanup: komponent unmount bo'lganda yoki imageLeft o'zgarganda
        return () => {
            ctx.revert();
            window.removeEventListener('resize', handleResize); // ✅ YANGI: Event listener ni o'chirish
        }
    }, [imageLeft])

    const isEven = index % 2 === 0; // index juft bo'lsa, rasm chapda, matn o'ngda; toq bo'lsa, aksincha
    
    return (
        // ✅ YANGI: overflow-hidden qo'shildi horizontal scroll ni oldini olish uchun
        <section 
            ref={sectionRef} 
            className={`py-16 sm:py-24 overflow-hidden ${isEven ? "bg-[#FFF6F8]" : "bg-gradient-to-b from-[#FFF6F8] via-[#FDE6EC] to-transparent"}`}
        >
            <div className={styles.container}>
                {/* ✅ YANGI: overflow-hidden qo'shildi flex container ga */}
                <div className={`flex flex-col ${imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16 overflow-hidden`}>
                    {/* Image */}
                    <div ref={imageRef} className="w-full lg:w-1/2">
                        <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                            <img 
                                src={image} 
                                alt={title} 
                                className="w-full h-64 sm:h-80 lg:h-96 object-cover" 
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div ref={textRef} className="w-full lg:w-1/2 space-y-6">
                        <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#3A2B2F]">
                            {title}
                        </h2>
                        <p className="text-lg text-[#8C6F76] leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}