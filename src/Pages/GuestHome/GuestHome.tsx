import GuestNav from "@/components/NavBar/GuestNav";
import VideoCarousel from "@/components/Hero/VideoCarousel";
import ZigZagsection from "@/components/ZigZigSection/ZigZagsection";
import { ZigZagData } from "@/constants/Data";

export default function GuestHome() {
  return (
    <div className="relative">
      <GuestNav />
      <VideoCarousel />
      {
        ZigZagData.map((item, index) => {
          return (
            <ZigZagsection
              key={index}
              index={index}
              image={item.image}
              title={item.title}
              description={item.description}
              imageLeft={index % 2 === 0}
            />
          )
        })
      }
      {/* Other sections will go here */}
    </div>
  )
}
