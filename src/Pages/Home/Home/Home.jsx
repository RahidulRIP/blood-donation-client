import Banner from "./Banner";
import ContactUsSection from "./ContactUsSection";
import FeaturedSection from "./FeaturedSection";

const Home = () => {
  return (
    <div className="p-2.5">
      <div className="py-6 md:py-20 ">
        <Banner />
      </div>
      <div>
        <FeaturedSection />
      </div>
      <div className="py-6 md:py-20">
        <ContactUsSection />
      </div>
    </div>
  );
};

export default Home;
