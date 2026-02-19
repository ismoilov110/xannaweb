import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormValues } from "../../Schemas/LoginValidation"
import { Link, useNavigate } from "react-router-dom"
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDispatch } from "react-redux"
import { logInThunk } from "@/features/Auth/Auth.thunks"
import { cleanPhoneNumber } from "@/utils/phone"
import PhoneInputComponent from "../ui/PhoneInput"
import SuccessOverlay from "../ui/SuccessOverlay"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    setError, // ✅ shu yerga ko‘chdi
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    const payload = {
      phone_number: cleanPhoneNumber(data.PhoneNumber),
      password: data.password1.trim(),
    }

    try {
      await (dispatch(logInThunk(payload) as any).unwrap())
      setShowSuccess(true)
    } catch (err: any) {
      // ✅ RTK unwrap errorlar uchun universal parsing
      const status = err?.status || err?.response?.status
      const serverData = err?.data || err?.response?.data

      if (status === 401) {
        setError("password1", { type: "server", message: "Telefon yoki parol noto'g'ri" })
        return
      }

      const msg =
        serverData?.detail ||
        serverData?.message ||
        "Login yoki nomeringiz noto‘g‘ri"

      setError("password1", { type: "server", message: msg })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDECEF] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white px-8 py-10">
        <div className="-mt-4">
          <Link to={"/"}>
            <h3 className="flex items-center font-medium text-[#B48A92] text-[15px] leading-1 hover:text-black gap-1">
              <ArrowLeft className={cn("w-[15px] h-[15px]")} /> Bosh Sahifa
            </h3>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#2E2E2E]">LOOKME</h1>
          <p className="mt-2 text-sm text-[#9A7F85]">Hisobingizga kiring</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Phone */}
          <PhoneInputComponent
            control={control}
            name="PhoneNumber"
            label="Telefon raqam"
            error={errors.PhoneNumber?.message}
          />

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-[#2E2E2E]">Parol</label>
              <Link to="/forgot-password" className="text-xs text-[#F98CA1] hover:underline">
                Parolni unutdingizmi?
              </Link>
            </div>

            <div className="relative mt-1">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B48A92]" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password1")}
                placeholder="********"
                className={`w-full rounded-xl bg-[#FFF7F8] py-3 pl-11 pr-11 text-sm outline-none border ${errors.password1 ? "border-red-400" : "border-[#F3D5DB]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B48A92]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* ✅ faqat bitta joyda chiqarsin */}
            {errors.password1 && <p className="text-xs text-red-500 mt-1">{errors.password1.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#F98CA1] py-3 text-white font-medium transition hover:bg-[#F8758F] disabled:opacity-60"
          >
            {isSubmitting ? "Tekshirilmoqda..." : "Kirish"}
          </button>

          <p className="text-center text-sm text-[#9A7F85]">
            Hisobingiz yo‘qmi?{" "}
            <Link to="/register" className="text-[#F98CA1] font-medium">
              Ro‘yxatdan o‘ting
            </Link>
          </p>
        </form>
      </div>
      <SuccessOverlay open={showSuccess} onDone={() => navigate("/home")} />
    </div>
  )
}
