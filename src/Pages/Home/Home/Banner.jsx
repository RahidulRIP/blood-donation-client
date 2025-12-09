import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Container from "../../../Components/Container/Container";
import { FaHeart, FaSearch } from "react-icons/fa";
import bannerImg1 from "../../../assets/banner_4.jpeg";
import bannerImg2 from "../../../assets/banner_2.jpeg";
import bannerImg3 from "../../../assets/banner_3.jpeg";
import bannerImg4 from "../../../assets/banner_4.jpeg";
import bannerImg5 from "../../../assets/banner_5.jpeg";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const slides = [
    {
      img: bannerImg1,
      heading: "Save a Life, Donate Blood",
      subtext:
        "Every two seconds, someone in the U.S. needs blood. Your donation can make all the difference.",
    },
    {
      img: bannerImg2,
      heading: "Be a Hero: Give Blood Today",
      subtext:
        "It's safe, simple, and the most powerful way to give back to your community.",
    },
    {
      img: bannerImg3,
      heading: "Connect through BloodLink",
      subtext:
        "Join our community of donors and recipients. A single pint can save up to three lives.",
    },
    {
      img: bannerImg4,
      heading: "Your Blood Can Save Families",
      subtext:
        "Accident victims, cancer patients, and newborns rely on donors like you every day.",
    },
    {
      img: bannerImg5,
      heading: "Donate Blood, Spread Hope",
      subtext:
        "One act of kindness can create a ripple of hope. Become a life-saver today.",
    },
  ];

  const handleBannerJoinButton = () => {
    navigate("/register");
  };

  return (
    <Container>
      <div className="relative md:-mt-10 overflow-hidden rounded-2xl shadow-xl">
        <div className="h-[350px] md:h-[550px] lg:h-[700px]">
          <Carousel autoPlay infiniteLoop interval={3000} className="h-full">
            {slides.map((slide, index) => (
              <div key={index} className="relative h-full">
                <img
                  src={slide.img}
                  alt={slide.heading}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center text-white p-4 md:p-12">
                  <div className="max-w-xl md:space-y-4">
                    <h1 className="text-3xl sm:text-lg lg:text-4xl font-extrabold leading-tight">
                      {slide.heading}
                    </h1>

                    <p className=" font-light">{slide.subtext}</p>

                    <div className="flex items-center gap-4 pt-4 md:ml-20">
                      {/* join and welcome Button */}
                      <button
                        onClick={handleBannerJoinButton}
                        disabled={user?.email && true}
                        className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm sm:text-lg font-bold shadow-lg transition duration-300 hover:bg-red-700"
                      >
                        <FaHeart size={20} />
                        {user?.email
                          ? `Welcome ${user?.displayName}`
                          : "Join as a donor"}
                      </button>

                      {/* Search Button */}
                      <button className="flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm sm:text-lg font-semibold transition duration-300 hover:bg-white hover:text-red-600">
                        <FaSearch size={20} />
                        Search Donors
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
