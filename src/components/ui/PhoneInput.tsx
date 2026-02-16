import PhoneInput from "react-phone-number-input"
import { Controller } from "react-hook-form"
import { cn } from "@/lib/utils"
// CSS for react-phone-number-input is imported in index.css or we can import it here if we use a specific file, 
// but usually it's better to add the styles globaly or use the provided css.
// We will assume the styles are added in index.css as per plan.

interface PhoneInputProps {
    control: any
    name: string
    label?: string
    className?: string
    error?: string
    placeholder?: string
}

const PhoneInputComponent = ({
    control,
    name,
    label,
    className,
    error,
    placeholder = "+998 90 123 45 67"
}: PhoneInputProps) => {
    return (
        <div className={cn("w-full", className)}>
            {label && (
                <label className="text-sm text-[#2E2E2E] mb-1 block">
                    {label} <span className="text-red-400">*</span>
                </label>
            )}
            <div className="relative">
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput
                            international
                            defaultCountry="UZ"
                            value={value}
                            onChange={onChange}
                            className={cn(
                                "flex h-12 w-full rounded-xl border bg-[#FFF7F8] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                error ? "border-red-400" : "border-[#F3D5DB]",
                                "phone-input-custom" // Custom class for overriding internal styles
                            )}
                            placeholder={placeholder}
                        />
                    )}
                />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    )
}

export default PhoneInputComponent
