import type { ReactNode } from "react";

interface ProfileInfoCardProps {
    icon: ReactNode;
    label: string;
    value: string | ReactNode;
    rightElement?: ReactNode;
}

export default function ProfileInfoCard({ icon, label, value, rightElement }: ProfileInfoCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-50 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                {/* Icon container */}
                <div className="w-12 h-12 rounded-xl bg-[#FFF0F3] flex items-center justify-center text-[#F48894]">
                    {icon}
                </div>

                {/* Text content */}
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">{label}</span>
                    <span className="text-[#382E31] font-semibold text-lg">{value}</span>
                </div>
            </div>

            {/* Optional right element (e.g., status indicator) */}
            {rightElement && (
                <div>{rightElement}</div>
            )}
        </div>
    );
}
