import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUserEdit, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router"; // Ensure this matches your router version (react-router-dom)
import Container from "../../../Components/Container/Container";

const HomeBlog = () => {
  const blogs = [
    {
      id: 1,
      category: "Health Tips",
      title: "What to eat before and after donating blood?",
      date: "Oct 12, 2025",
      author: "Dr. Rahat",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop",
      path: "/blog/nutrition-guide" // Unique path for the details page
    },
    {
      id: 2,
      category: "Medical News",
      title: "The impact of rare blood groups in emergencies.",
      date: "Oct 15, 2025",
      author: "Admin",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1450&auto=format&fit=crop",
      path: "/blog/rare-blood-impact"
    },
    {
      id: 3,
      category: "Community",
      title: "How your one pint can save three separate lives.",
      date: "Oct 18, 2025",
      author: "Volunteer Team",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1632&auto=format&fit=crop",
      path: "/blog/saving-lives"
    },
  ];

  return (
    <section className="fixed-spacing bg-base-200/50">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">
              Knowledge Base
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-2">
              LATEST <span className="text-red-600 uppercase">Insights</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors border-b-2 border-slate-200 hover:border-red-600 pb-1"
          >
            Browse All Articles
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Wrapping the image and content in a Link for better UX */}
              <Link to={post.path} className="block cursor-pointer">
                <div className="relative h-64 mb-6 overflow-hidden rounded-[2.5rem]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center gap-6 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-red-500" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUserEdit className="text-red-500" />
                      {post.author}
                    </div>
                  </div>

                  <h3 className="text-xl font-black h-14 leading-tight mb-4 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-red-600 transition-all">
                    Read Article{" "}
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeBlog;