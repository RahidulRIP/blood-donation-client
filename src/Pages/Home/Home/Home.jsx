import Banner from "./Banner";
import ContactUsSection from "./ContactUsSection";
import FAQSection from "./FAQSection";
import FeaturedSection from "./FeaturedSection";
import HomeBlog from "./HomeBlog";
import HowItWorks from "./HowItWorks";
import LiveRequests from "./LiveRequests";
import PartnersNetwork from "./PartnersNetwork";
import StatsImpact from "./StatsImpact";
import TopDonors from "./TopDonors";
import VolunteerCTA from "./VolunteerCTA";

const Home = () => {
  return (
    <div className="p-2.5 bg-base-200">
      <div className="py-6 md:py-20 ">
        <Banner />
      </div>
      <div>
        <LiveRequests />
      </div>
      <div>
        <StatsImpact />
      </div>
      <div>
        <PartnersNetwork />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div>
        <FeaturedSection />
      </div>
      <div>
        <TopDonors />
      </div>
      <div>
        <HomeBlog />
      </div>

      <div>
        <VolunteerCTA />
      </div>
      <div>
        <FAQSection />
      </div>

      <div className="py-6 md:py-20">
        <ContactUsSection />
      </div>
    </div>
  );
};

export default Home;
