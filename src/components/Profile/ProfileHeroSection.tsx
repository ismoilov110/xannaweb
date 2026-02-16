import {  useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import {
//   openEdit,
//   closeEdit,
//   saveProfile,
// } from "@/Reducer/ProfileSlice";
import type { RootState } from "@/Store"; // Adjust the path if your store file is elsewhere

export default function ProfileHeroSection() {
  // const dispatch = useDispatch()

  const userData = useSelector(
    (state: RootState) => state.profile.userData
  );
 
  return (
    <section className="flex flex-wrap justify-center items-center">
      {/* Profile hero section */}
      <div className="mb-10">
        {/* Avatar with gradiant border */}
        <div className="relative inline-block group mb-6">
          <div className="absolute -inset-1  bg-gradient-to-r from-[#6366F1] via-[#EC4899] to-[#6366F1] rounded-full opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300 ">
            <div className="relative">
              <Avatar className="w-32 h-32 bg-white">
                <AvatarImage
                  src={userData.avatar}
                  alt={userData.name}
                  className="object-cover"
                />
                <AvatarFallback>
                   {userData.name.charAt(0)}
                </AvatarFallback>
                
              </Avatar>
              <h2>{userData.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
