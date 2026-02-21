"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormValues } from "../../Schemas/RegisterValidation"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Lock, Eye, EyeOff, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useDispatch } from "react-redux"
import { RegisterThunk } from "@/features/Auth/Auth.thunks"
import PhoneInputComponent from "../ui/PhoneInput"
import SuccessOverlay from "../ui/SuccessOverlay"
import { cleanPhoneNumber } from "@/utils/phone"

export default function Regis() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  })


  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // MUHIM: Animatsiya boshlanishidan oldin barcha elementlar ko'rinishini ta'minlash
    if (!containerRef.current || !titleRef.current || !formRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      })

      // 1. Konteyner animatsiyasi
      tl.from(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        scale: 0.9,
        clearProps: "all" // Animatsiya tugagach barcha inline style'larni olib tashlash
      })

        // 2. Title animatsiyasi
        .from(titleRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.6,
          clearProps: "all"
        }, "-=0.4")

        // 3. Form elementlari animatsiyasi
        .from(Array.from(formRef.current?.children || []), {
          x: -50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          clearProps: "all"
        }, "-=0.3")
    })

    // Cleanup: Component unmount bo'lganda animatsiyalarni to'xtatish
    return () => ctx.revert()

  }, [])

  // 

  const onSubmit = async (data: RegisterFormValues) => {
    // backenga jonatiladigan data va bu datani backend kutadi
    const payload = {
      phone_number: cleanPhoneNumber(data.phoneNumber),
      first_name: data.name,
      last_name: data.surname,
      password1: data.password1,
      password2: data.password2
    };


    try {
      await dispatch(RegisterThunk(payload) as any).unwrap()
      setShowSuccess(true)
    } catch (err: any) {
      // unwrap() bilan rejectWithValue ishlatilganda err to'g'ridan-to'g'ri server response bo'ladi
      const serverData = err?.response?.data || err?.data || err;

      if (serverData) {
        // Telefon raqami band bo'lsa
        if (serverData.phone_number) {
          const msg = Array.isArray(serverData.phone_number) ? serverData.phone_number[0] : serverData.phone_number;
          const errorMsg = (msg.toLowerCase().includes("already exists") || msg.toLowerCase().includes("already registered"))
            ? "Bu telefon raqami allaqachon ro'yxatdan o'tgan"
            : msg;

          setError("phoneNumber", { type: "server", message: errorMsg });
        }

        // Boshqa maydonlar uchun xatoliklar
        if (serverData.first_name) {
          const msg = Array.isArray(serverData.first_name) ? serverData.first_name[0] : serverData.first_name;
          setError("name", { type: "server", message: msg });
        }
        if (serverData.last_name) {
          const msg = Array.isArray(serverData.last_name) ? serverData.last_name[0] : serverData.last_name;
          setError("surname", { type: "server", message: msg });
        }
        if (serverData.password1) {
          const msg = Array.isArray(serverData.password1) ? serverData.password1[0] : serverData.password1;
          setError("password1", { type: "server", message: msg });
          setError("password2", { type: "server", message: msg });
        }
      }
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDECEF] px-4">
      <div
        ref={containerRef}
        className="w-full max-w-md rounded-2xl bg-white px-8 py-10 shadow-xl"
      >
        <div className="-mt-4">
          <Link to={"/"}>
            <h3 className="flex items-center font-medium text-[#B48A92] text-[15px] leading-1 hover:text-black gap-1">
              <ArrowLeft className={cn("w-[15px] h-[15px]")} /> Bosh Sahifa
            </h3>
          </Link>
        </div>

        <div ref={titleRef} className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#2E2E2E]">LOOKME</h1>
          <p className="mt-2 text-sm text-[#9A7F85]">
            Yangi hisob yaratish
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-[#2E2E2E]">Ism</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B48A92]" />
                <input
                  {...register("name")}
                  placeholder="Ismingiz"
                  className={`w-full rounded-xl bg-[#FFF7F8] pl-10 pr-4 py-3 text-sm outline-none border ${errors.name ? "border-red-400" : "border-[#F3D5DB]"
                    }`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-sm text-[#2E2E2E]">Familiya</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B48A92]" />
                <input
                  {...register("surname")}
                  placeholder="Familiyangiz"
                  className={`w-full rounded-xl bg-[#FFF7F8] pl-10 pr-4 py-3 text-sm outline-none border ${errors.surname ? "border-red-400" : "border-[#F3D5DB]"
                    }`}
                />
              </div>
              {errors.surname && <p className="text-xs text-red-500 mt-1">{errors.surname.message}</p>}
            </div>
          </div>

          {/* Phone Number */}
          <PhoneInputComponent
            control={control}
            name="phoneNumber"
            label="Telefon raqam"
            error={errors.phoneNumber?.message}
          />

          {/* 
          <div>
            <label className="text-sm text-[#2E2E2E]">
              Email <span className="text-[#9A7F85]">(ixtiyoriy)</span>
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B48A92]" />
              <input
                {...register("email")}
                placeholder="email@example.com"
                className={`w-full rounded-xl bg-[#FFF7F8] pl-10 pr-4 py-3 text-sm outline-none border ${errors.email ? "border-red-400" : "border-[#F3D5DB]"
                  }`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div> */}

          <div>
            <label className="text-sm text-[#2E2E2E]">Parol</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B48A92]" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password1")}
                placeholder="********"
                className={`w-full rounded-xl bg-[#FFF7F8] pl-10 pr-12 py-3 text-sm outline-none border ${errors.password1 ? "border-red-400" : "border-[#F3D5DB]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B48A92] hover:text-[#9A7F85]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password1 && <p className="text-xs text-red-500 mt-1">{errors.password1.message}</p>}
          </div>

          <div>
            <label className="text-sm text-[#2E2E2E]">Parolni Qayta kiritish</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B48A92]" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("password2")}
                placeholder="********"
                className={`w-full rounded-xl bg-[#FFF7F8] pl-10 pr-12 py-3 text-sm outline-none border ${errors.password2 ? "border-red-400" : "border-[#F3D5DB]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B48A92] hover:text-[#9A7F85]"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {/* Password2 errors - MOVED OUTSIDE RELATIVE CONTAINER */}
            <div className="min-h-[20px]">
              {errors.password2 && <p className="text-xs text-red-500 mt-1">{errors.password2.message}</p>}
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className="mt-4 w-full cursor-pointer rounded-xl bg-[#F98CA1] py-3 text-white font-medium transition hover:bg-[#F8758F] disabled:opacity-60"
          >
            {isSubmitting ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
          </button>

          <p className="text-center text-sm text-[#9A7F85] mt-4">
            Hisobingiz bormi?{" "}
            <Link to="/login" className="text-[#F98CA1] font-medium">
              Kirish
            </Link>
          </p>
        </form>
      </div>
      <SuccessOverlay open={showSuccess} onDone={() => navigate("/obuna")} />
    </div>
  )
}