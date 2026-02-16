import { PaymentMethodes } from "@/constants/Data"
import { Button } from "../ui/button"

export default function SubscribeSeaction() {
    const PaymentMethodsSection = ({ isVisible }: { isVisible: boolean }) => {
        return (
            <div
                className={`grid grid-cols-3 gap-4 overflow-hidden transition-all duration-500 ease-in-out ${isVisible
                    ? "max-h-40 opacity-100 mt-6 pt-6 border-t border-[#F3D3DA]"
                    : "max-h-0 opacity-0 mt-0 pt-0 border-t-0"
                    }`}
            >
                {
                    PaymentMethodes.map((method) => {
                        return (
                            <Button
                                key={method.id}
                                disabled={method.comingSoon}
                                className={`relative bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl p-4 transition-all ${method.comingSoon ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >

                                <span className="text-2xl mb-1 block">{method.logo}</span>
                                <span className="font-medium text-[#3A2B2F] text-sm">{method.name}</span>
                                {method.comingSoon && (
                                    <span className="absolute top-1 right-1 text-sm bg-gray-200 px-1.5 py-0.5 rounded-full text-[#8C6F76]">tez kunda</span>
                                )}
                            </Button>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <section>
           <PaymentMethodsSection isVisible={true}/>
        </section>
    )
}
