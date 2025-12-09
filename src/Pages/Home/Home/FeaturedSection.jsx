import { FaUserFriends, FaMapMarkerAlt, FaHeartbeat } from "react-icons/fa";
import Container from "../../../Components/Container/Container";

const FeaturedSection = () => {
  const features = [
    {
      icon: FaHeartbeat,
      title: "Make an Impact",
      description:
        "A single donation can save up to three lives. See how your contribution directly helps patients in need across the country.",
      stat: "3 LIVES",
      statLabel: "Saved Per Donation",
      color: "text-red-600",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Find a Drive Near You",
      description:
        "Use our locator to find the nearest blood donation centers and mobile drives. Schedule your appointment in minutes.",
      stat: "500+",
      statLabel: "Active Donation Centers",
      color: "text-blue-500",
    },
    {
      icon: FaUserFriends,
      title: "Join Our Community",
      description:
        "Become part of the BloodLink family. Track your donation history, earn badges, and motivate others to give.",
      stat: "10K+",
      statLabel: "Registered Donors",
      color: "text-green-500",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Why <span className="text-red-600">BloodLink</span> Matters
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Our mission is simple: connecting donors to those in urgent need.
            See the difference we make.
          </p>
        </div>

        {/* Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-red-600"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`${feature.color} bg-opacity-10 p-3 rounded-full mb-4`}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-gray-800">
                    {feature.stat}
                  </p>
                  <p className="text-sm text-gray-500 font-semibold">
                    {feature.statLabel}
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mt-6">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600 min-h-[72px]">
                {feature.description}
              </p>

              <button
                className={`mt-6 text-sm font-semibold flex items-center gap-2 ${feature.color} hover:underline`}
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedSection;
