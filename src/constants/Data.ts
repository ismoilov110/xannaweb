// NavLink data

export const NavLink = [
    {
        id: 0,
        title: "Bosh sahifa",
        href: "/home"
    },
    {
        id: 1,
        title: "Obuna",
        href: "/obuna"
    },
    {
        id: 2,
        title: "Kontentlar",
        href: "/kontentlar"
    },
]

// Category Data 
import {
    ChefHat,
    MapPin,
    Lightbulb,
    BookOpen,
    Heart,
} from "lucide-react";

export const CategroyDatas = [
    {
        id: 0,
        titles: "Qanday ovqat qilish",
        desc: "Mazali va sog'lom retseptlar",
        icon: ChefHat,
        color: "from-yellow-100 to-yellow-50",
        iconColor: "text-yellow-600",
    },
    {
        id: 1,
        titles: "Kechgi sayrga qayerga borish",
        desc: "Eng yaxshi joylar va tavsiyalar",
        icon: MapPin,
        color: "from-blue-100 to-blue-50",
        iconColor: "text-blue-500",
    },
    {
        id: 2,
        titles: "Foydali lifehack",
        desc: "Kundalik hayotni osonlashtiruvchi maslahatlar",
        icon: Lightbulb,
        color: "from-yellow-100 to-yellow-50",
        iconColor: "text-yellow-600",
    },
    {
        id: 3,
        titles: "Qanday kitob o'qish",
        desc: "Eng zo'r kitoblar tavsiyasi",
        icon: BookOpen,
        color: "from-green-100 to-green-50",
        iconColor: "text-green-600",
    },
    {
        id: 4,
        titles: "O'ziga qarash bo'yicha maslahat",
        desc: "Go'zallik va salomatlik sirlari",
        icon: Heart,
        color: "from-pink-100 to-pink-50",
        iconColor: "text-pink-500",
    },
]


//  Subscribe Data cardi uchun data 

export const Plans = [
    {
        id: 0,
        name: "Oylik",
        price: "49,000",
        period: "oyiga",
        populer: false,
        features: [
            "Barcha kategoriyalarga kirish",
            "XANNA bilan cheksiz suhbat",
            "Shaxsiy maslahatlar",
            "Kunlik motivatsiya",
        ],
    },
]

// Tolov usulari uchun data

export const PaymentMethodes = [
    {
        id: 0,
        name: "Payme",
        logo: "💳",
    },
    {
        id: 1,
        name: "Click",
        logo: "💳",
    },
    {
        id: 2,
        name: "Paynet",
        logo: "💳",
        comingSoon: true
    },
]


// ZigZagSection uchun data
import GuestImg from "@/assets/photo_2026-02-09_16-41-19 (2).jpg"
import GuestImg2 from "@/assets/photo_2026-02-09_16-41-11 (2).jpg"
import GuestImg3 from "@/assets/photo_2026-02-09_16-40-34 (2).jpg"

export const ZigZagData = [
    {
        id: 0,
        image: GuestImg,
        title: "LOOKME bilan orzudagi mashinani yutib oling",
        description: "Faolligingiz sovringa aylansin. LOOKME siz uchun katta imkoniyatlar tayyorlaydi — ishtirok eting, rivojlaning va orzudagi mashinani yutib olish imkoniyatiga ega bo‘ling."
    },
    {
        id: 1,
        image: GuestImg2,
        title: "LOOKME bilan o'z hayotingizni yaxshilang",
        description: "LOOKME siz uchun o'z hayotingizni yaxshilash imkoniyatlarini tayyorlaydi — ishtirok eting, rivojlaning va o'z hayotingizni yaxshilang."
    },
    {
        id: 2,
        image: GuestImg3,
        title: "LOOKME bilan yangi imkoniyatlarga ega bo'ling",
        description: "LOOKME siz uchun yangi imkoniyatlarga ega bo'lish imkoniyatini tayyorlaydi — ishtirok eting, rivojlaning va yangi imkoniyatlarga ega bo'ling."
    }
]