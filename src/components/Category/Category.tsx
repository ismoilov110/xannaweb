import { styles } from "@/Styles/Styles";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getCategories, type ApiCategory } from "@/Services/AiChat/AiChat.services";

export default function Category() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ApiCategory[]>([]);
    const [loading, setLoading] = useState(true);

    const palette = useMemo(
        () => [
            { color: "from-yellow-100 to-yellow-50", iconColor: "text-yellow-600" },
            { color: "from-blue-100 to-blue-50", iconColor: "text-blue-500" },
            { color: "from-yellow-100 to-yellow-50", iconColor: "text-yellow-600" },
            { color: "from-green-100 to-green-50", iconColor: "text-green-600" },
            { color: "from-pink-100 to-pink-50", iconColor: "text-pink-500" },
        ],
        []
    );

    useEffect(() => {
        (async () => {
            try {
                const list = await getCategories();
                setCategories(list);
            } catch (e: any) {
                const status = e?.response?.status;
                if (status === 401) navigate("/login");
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    return (
        <section className="py-20 bg-[#FBE8EC] ">
            <div className={styles.container}>
                <div className="text-center">
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-black">
                        XANNA bilan suhbatlashing
                    </h3>
                    <p className="text-lg text-[#8C6F76] ">
                        Sizni qiziqtirgan mavzuni tanlang va shaxsiy AI maslahatchingiz bilan gaplashing
                    </p>
                </div>

                <div className="grid grid-cols-1 mt-20 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border p-6 border-white/20 bg-white/70 backdrop-blur-xl shadow-xl">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-md mb-4" />
                                <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
                                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                                <div className="h-4 w-4/5 bg-gray-200 rounded" />
                            </div>
                        ))
                        : categories.map((c, index) => {
                            const p = palette[index % palette.length];

                            return (
                                <Link
                                    key={c.id}
                                    to={`/chat/${c.id}`}
                                    className="group relative rounded-2xl border p-6 border-white/20 bg-white backdrop-blur-xl shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    <div className="relative z-10">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFFFFF] shadow-md mb-4 transition-transform duration-300 overflow-hidden">
                                            <img
                                                className={`text-2xl ${p.iconColor}`} src={c.image} alt={c.name} />
                                        </div>

                                        <h3 className="font-serif text-xl font-medium mb-2 text-[#1A1A1A]">{c.title}</h3>


                                        <div className="flex items-center text-[#F28BA8] text-sm font-medium group-hover:gap-2 transition-all duration-300">
                                            <span>XANNA bilan Gaplashish</span>
                                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
