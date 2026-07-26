import { motion } from "framer-motion";
import Card from "../Card";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function SimilarHomestays({ currentId }) {
  // Pool of fallback homestays for recommended options
  const defaultList = [
    {
      id: 1,
      name: "Ubud Rainforest Eco-Villa",
      title: "Ubud Rainforest Eco-Villa & Spa",
      location: "Ubud, Bali, Indonesia",
      price: 3499,
      category: "Nature & Eco Villa",
      rating: "4.96",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
      description: "Lush tropical rice terraces and pristine rainforest retreat with private infinity pool and organic dining."
    },
    {
      id: 2,
      name: "Manali Alpine Haven",
      title: "Manali Alpine Haven & Chalet",
      location: "Manali, Himachal Pradesh, India",
      price: 2899,
      category: "Mountain Retreat",
      rating: "4.92",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80",
      description: "Cozy wooden alpine cabin surrounded by snow-capped Himalayan peaks and pine forests."
    },
    {
      id: 3,
      name: "Goa Heritage Sunset Cottage",
      title: "Goa Heritage Sunset Cottage",
      location: "Anjuna, Goa, India",
      price: 4199,
      category: "Beachfront Villa",
      rating: "4.98",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      description: "Charming Portuguese-style beach cottage situated right on the golden sands of Anjuna."
    },
    {
      id: 4,
      name: "Coorg Coffee Estate Stay",
      title: "Coorg Coffee Estate Stay",
      location: "Coorg, Karnataka, India",
      price: 2599,
      category: "Luxury Plantation",
      rating: "4.89",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1600&q=80",
      description: "50-acre fragrant coffee and spice plantation experience with guided tours and private verandas."
    },
    {
      id: 5,
      name: "Jaipur Royal Haveli Suite",
      title: "Jaipur Royal Haveli Suite",
      location: "Jaipur, Rajasthan, India",
      price: 4999,
      category: "Heritage Palace",
      rating: "4.95",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      description: "Royal Rajasthani heritage stay with hand-carved stone arches and courtyard fountains."
    },
    {
      id: 6,
      name: "Munnar Tea Valley Cabin",
      title: "Munnar Tea Valley Sanctuary",
      location: "Munnar, Kerala, India",
      price: 3199,
      category: "Hilltop Sanctuary",
      rating: "4.91",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
      description: "Perched high above rolling tea gardens with floor-to-ceiling glass windows and private tea tasting."
    },
  ];

  // Filter out current homestay and pick top 3
  const similarStays = defaultList
    .filter((item) => String(item.id) !== String(currentId))
    .slice(0, 3);

  const handleCardClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pt-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Recommendations</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Similar Homestays You Might Love
          </h3>
        </div>

        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <span>Explore All Homestays</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of 3 Card Components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {similarStays.map((home) => (
          <div key={home.id} onClick={handleCardClick} className="h-full">
            <Card
              id={home.id}
              title={home.name || home.title}
              location={home.location}
              price={home.price}
              category={home.category}
              rating={home.rating}
              image={home.image}
              description={home.description}
              homestay={home}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default SimilarHomestays;
