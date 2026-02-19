import { CategroyDatas } from "@/constants/Data";
import { styles } from "@/Styles/Styles";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Category() {
    return (
        <section className="py-20 bg-[#FBE8EC] ">
            <div className={styles.container}>
                {/* Header Category */}
                <div className="text-center">
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-black"> AI bilan suhbatlashing</h3>
                    <p className="text-lg text-[#8C6F76] ">Sizni qiziqtirgan mavzuni tanlang va shaxsiy AI maslahatchingiz bilan gaplashing</p>
                </div>

                {/* Category grid */}

                <div className="grid grid-cols-1 mt-20 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        CategroyDatas.map((category, index) => (
                            <Link key={category.id}
                                to={`/chat/${category.id}`}
                                className="group relative rounded-2xl border p-6 border-white/20 bg-white backdrop-blur-xl shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                
                                {/* Content - relative positioning to stay above gradient */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFFFFF] shadow-md mb-4 transition-transform duration-300`}>
                                        <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                                    </div>
                                    
                                    <h3 className="font-serif text-xl font-medium mb-2 text-[#1A1A1A]">{category.titles}</h3>
                                    <p className="text-[#8C6F76] text-sm mb-4">{category.desc}</p>

                                    {/* Arrow */}
                                    <div className="flex items-center text-[#F28BA8] text-sm font-medium group-hover:gap-2 transition-all duration-300">
                                        <span>XANNA bilan Gaplashish</span>
                                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}