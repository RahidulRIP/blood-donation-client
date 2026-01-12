import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Container from "../../../Components/Container/Container";
import {
  FaHeart,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import bannerImg1 from "../../../assets/banner_4.jpeg";
import bannerImg2 from "../../../assets/banner_2.jpeg";
import bannerImg3 from "../../../assets/banner_3.jpeg";
import bannerImg5 from "../../../assets/banner_5.jpeg";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const slides = [
    {
      img: bannerImg1,
      heading: "Save a Life, Donate Blood",
      subtext:
        "Every two seconds, someone needs blood. Your donation can make all the difference in a life-or-death situation.",
    },
    {
      img: bannerImg2,
      heading: "A Drop of Hope, A World of Life",
      subtext:
        "It's safe, simple, and the most powerful way to give back. A single pint can save up to three lives today.",
    },
    {
      img: bannerImg3,
      heading: "Connect Through BloodLink",
      subtext:
        "Join our global community of heroes. We bridge the gap between donors and those in urgent need.",
    },
    {
      img: bannerImg5,
      heading: "Donate Blood, Spread Hope",
      subtext:
        "One act of kindness can create a ripple of hope. Become a life-saver today.",
    },
  ];

  return (
    <Container>
      <div className="relative md:-mt-8 overflow-hidden rounded-[2.5rem] bg-zinc-950 shadow-2xl group border border-white/5">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showStatus={false}
          // CUSTOM NAVIGATION ARROWS
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                onClick={onClickHandler}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-rose-600"
              >
                <FaChevronLeft size={20} />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                onClick={onClickHandler}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-rose-600"
              >
                <FaChevronRight size={20} />
              </button>
            )
          }
          // CUSTOM MODERN PILL INDICATORS
          renderIndicator={(onClickHandler, isSelected, index) => (
            <li
              className={`inline-block mx-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-500 ${
                isSelected
                  ? "bg-rose-600 w-10"
                  : "bg-white/20 w-4 hover:bg-white/40"
              }`}
              onClick={onClickHandler}
              key={index}
            />
          )}
          className="h-[550px] md:h-[650px] lg:h-[800px]"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative h-[550px] md:h-[650px] lg:h-[800px] w-full overflow-hidden"
            >
              {/* 1. CINEMATIC BACKGROUND LAYER */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                  src={slide.img}
                  alt="Banner"
                  className="h-full w-full object-cover brightness-[0.4]"
                />
              </div>

              {/* 2. EYE-COMFORT GRADIENT LAYER */}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent lg:bg-linear-to-r lg:from-zinc-950 lg:via-zinc-950/20 lg:to-transparent" />

              {/* 3. CONTENT LAYER */}
              <div className="absolute inset-0 flex items-center p-8 md:p-20 lg:p-32">
                <div className="max-w-4xl text-left">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-8"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                    </span>
                    Join the Life-Saving Mission
                  </motion.div>

                  {/* Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-7xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-6"
                  >
                    {slide.heading}
                  </motion.h1>

                  {/* SUBTEXT (The missing piece) */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-zinc-400 text-base md:text-xl lg:text-2xl font-medium max-w-2xl leading-relaxed mb-10"
                  >
                    {slide.subtext}
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-5"
                  >
                    <button
                      onClick={() =>
                        navigate(user ? "/dashboard/profile" : "/register")
                      }
                      className="group flex items-center justify-center gap-3 rounded-2xl bg-rose-600 hover:bg-rose-700 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-rose-600/30 transition-all duration-300 active:scale-95"
                    >
                      <FaHeart className="group-hover:animate-bounce" />
                      {user ? "Go to Dashboard" : "Join as a Donor"}
                    </button>

                    <Link
                      to="/search-page"
                      className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/50 backdrop-blur-xl px-10 py-5 text-lg font-bold text-white transition-all hover:bg-white hover:text-black shadow-xl"
                    >
                      <FaSearch size={18} />
                      Find Donors
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default Banner;
