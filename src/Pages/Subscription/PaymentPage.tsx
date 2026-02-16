import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { api } from "@/Services/Api";

const BASE_URL = "https://xannaofficial.uz";
const FALLBACK_TARIFF_ID = 1;

type PaymentMethod = {
  id?: string;
  name?: string;
  url?: string;          // docs: url
  payment_url?: string;  // boshqa docs: payment_url
};

export default function PaymentPage() {
  const location = useLocation();
  const state = location.state as { tariffId?: number } | undefined;
  const tariffId = state?.tariffId ?? FALLBACK_TARIFF_ID;

  const [loading, setLoading] = useState(true);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [price, setPrice] = useState<string>("47 000 so'm");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/tariffs/${tariffId}/purchase/`);

        if (!isMounted) return;

        // backend 2 xil nom berishi mumkin:
        // payment_methods yoki payment_providers
        const pm: PaymentMethod[] =
          res.data?.payment_methods ||
          res.data?.payment_providers ||
          [];

        setMethods(pm);

        // tariff info bo‘lsa narxni ham chiqaramiz
        const t = res.data?.tariff;
        if (t?.price_formatted) setPrice(t.price_formatted);
        else if (t?.price) setPrice(`${t.price} so'm`);
      } catch (err) {
        console.log("PURCHASE ERROR:", err);
        alert("To‘lov usullarini olishda xatolik. Token yoki tarif id ni tekshiring.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [tariffId]);

  // methodlarni normalize qilamiz
  const normalized = useMemo(() => {
    return methods.map((m) => {
      const id = String(m.id ?? m.name ?? "").toLowerCase();
      const url = m.url ?? m.payment_url;
      return { id, url };
    });
  }, [methods]);

  const payme = normalized.find((m) => m.id.includes("payme"));
  const click = normalized.find((m) => m.id.includes("click"));

  const openPayment = (url?: string) => {
    if (!url) {
      alert("To‘lov linki topilmadi. Backend response’ni tekshiring.");
      return;
    }

    // tokenni olamiz va urlga qo'shamiz
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("access") ||
      localStorage.getItem("token") ||
      "";


    if (!token) {
      alert("Token topilmadi. Iltimos, tizimga qayta kiring.");
      return
    }

    // urlni to'liq qilamiz
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
    const separator = fullUrl.includes("?") ? "&" : "?"; // bu yerda urlda allaqachon "?" bor-yo'qligini tekshiramiz, agar bo'lsa "&" qo'shamiz, bo'lmasa "?" qo'shamiz

    window.location.href = `${fullUrl}${separator}token=${encodeURIComponent(token)}`;
  };

  return (
    <div className="min-h-screen bg-[#FDECEF] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-6">
        <Link
          to="/obuna"
          className="flex items-center text-[#9A7F85] hover:text-[#2E2E2E] transition-colors gap-2"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Ortga</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-[#F3D5DB]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif text-[#2E2E2E] mb-2">
            To'lov turini tanlang
          </h1>
          <p className="text-[#9A7F85]">
            Obuna narxi:{" "}
            <span className="text-[#F98CA1] font-bold">
              {loading ? "..." : price}
            </span>
          </p>
        </div>

        <div className="space-y-4">
          {/* Click */}
          <button
            disabled={loading || !click?.url}
            onClick={() => openPayment(click?.url)}
            className="w-full group relative flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#23A8F0] hover:bg-[#F0F9FF] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#23A8F0] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                CL
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#2E2E2E]">Click</h3>
                <p className="text-xs text-[#9A7F85]">Click Evolution orqali</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-[#E2E8F0] group-hover:border-[#23A8F0] group-hover:bg-[#23A8F0] flex items-center justify-center">
              <Check
                size={14}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </button>

          {/* Payme */}
          <button
            disabled={loading || !payme?.url}
            onClick={() => openPayment(payme?.url)}
            className="w-full group relative flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#00CCCC] hover:bg-[#E6FFFA] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00CCCC] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                PM
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#2E2E2E]">Payme</h3>
                <p className="text-xs text-[#9A7F85]">Payme App orqali</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-[#E2E8F0] group-hover:border-[#00CCCC] group-hover:bg-[#00CCCC] flex items-center justify-center">
              <Check
                size={14}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </button>

          {/* Paynet (Disabled) */}
          <div className="w-full relative opacity-60 grayscale cursor-not-allowed">
            <div className="absolute -top-2 -right-2 bg-[#F1F5F9] text-[#94A3B8] text-[10px] px-2 py-0.5 rounded-full border border-[#E2E8F0] font-bold z-10">
              TEZ KUNDA
            </div>
            <button
              disabled
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ECC94B] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  PN
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-[#94A3B8]">Paynet</h3>
                  <p className="text-xs text-[#CBD5E1]">Hozircha mavjud emas</p>
                </div>
              </div>
            </button>
          </div>

          {!loading && methods.length === 0 && (
            <p className="text-center text-xs text-[#9A7F85] pt-2">
              To‘lov usullari kelmadi. Token va tariff id ni tekshiring.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
