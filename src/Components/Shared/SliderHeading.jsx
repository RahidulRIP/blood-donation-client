import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const SliderHeading = () => {
  const donationHeadings = [
    "Donate Blood, Save Lives",
    "Become a Lifesaver Today",
    "Every Drop Counts",
    "Be the Reason for Someone’s Smile",
    "Join Our Life-Saving Mission",
    "Give the Gift of Life",
    "A Little Donation, A Big Impact",
    "Step Forward, Be a Hero",
    "Help Us Maintain a Safe Blood Supply",
    "One Donation Can Save Three Lives",
    "Your Kindness Makes a Difference",
    "Make a Life-Changing Contribution",
    "Be a Donor, Be a Hero",
    "Regular Donation, Regular Hope",
    "Ready to Save a Life Today?",
    "Support Humanity with a Simple Act",
    "Share Life Through Blood Donation",
    "Healthy Donor, Happy Life",
    "Let Your Blood Flow for a Good Cause",
  ];

  return (
    <div className="md:py-4 bg-white border-b border-gray-200 overflow-hidden">
      <Swiper
        loop={true}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {donationHeadings.map((heading, index) => (
          <SwiperSlide key={index}>
            <p
              className={`
                text-center 
                tracking-wider        
                transition-all duration-300
                px-4
                text-teal-500
              `}
            >
              {heading}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderHeading;
