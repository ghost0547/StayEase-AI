import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Card from "../components/Card";
import { HiSparkles } from "react-icons/hi2";

function Home() {
  const [homestays, setHomestays] = useState([]);

  // Curated fallback homestays for display when backend data is loading or empty
  const defaultHomestays = [
    {
      id: 1,
      name: "Ubud Rainforest Eco-Villa",
      location: "Ubud, Bali",
      price: 3499,
      category: "Nature & Eco",
      rating: "4.96",
    },
    {
      id: 2,
      name: "Manali Alpine Haven",
      location: "Manali, Himachal Pradesh",
      price: 2899,
      category: "Mountain Retreat",
      rating: "4.92",
    },
    {
      id: 3,
      name: "Goa Heritage Sunset Cottage",
      location: "Anjuna, Goa",
      price: 4199,
      category: "Beachfront",
      rating: "4.98",
    },
    {
      id: 4,
      name: "Coorg Coffee Estate Stay",
      location: "Coorg, Karnataka",
      price: 2599,
      category: "Luxury Plantation",
      rating: "4.89",
    },
    {
      id: 5,
      name: "Jaipur Royal Haveli Suite",
      location: "Jaipur, Rajasthan",
      price: 4999,
      category: "Heritage Luxury",
      rating: "4.95",
    },
    {
      id: 6,
      name: "Munnar Tea Valley Cabin",
      location: "Munnar, Kerala",
      price: 3199,
      category: "Hilltop Sanctuary",
      rating: "4.91",
    },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/homestays")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHomestays(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const displayList = homestays.length > 0 ? homestays : defaultHomestays;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Hero />

      {/* Featured Homestays Section */}
      <section id="homestays" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs sm:text-sm font-semibold">
            <HiSparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>AI-Curated Selections</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Homestays
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-normal leading-relaxed">
            Discover handpicked stays recommended for your next adventure.
          </p>
        </div>

        {/* Responsive Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {displayList.map((home, index) => (
            <motion.div key={home.id || index} variants={itemVariants} className="h-full">
              <Card
                title={home.name || home.title}
                location={home.location}
                price={home.price}
                category={home.category || (index % 2 === 0 ? "Luxury Stay" : "Nature Retreat")}
                rating={home.rating || "4.92"}
                image={home.image}
                description={home.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

export default Home;