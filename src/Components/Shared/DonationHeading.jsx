import Marquee from "react-fast-marquee";

const DonationHeading = () => {
  return (
    <div>
      <Marquee
        speed={60}
        gradient={false}
        pauseOnHover={true}
        className="py-4 bg-red-100"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-red-600 mx-10">
          🩸 Donate Blood • Save Lives • Be a Hero • Donate Blood • Save Lives •
          Be a Hero •
        </h1>
      </Marquee>
    </div>
  );
};

export default DonationHeading;
