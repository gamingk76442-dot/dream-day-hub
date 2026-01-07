import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const featuredProducts = [
  {
    id: "1",
    name: "Elegant Bridal Bouquet",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    category: "Flowers",
  },
  {
    id: "2",
    name: "Crystal Champagne Glasses Set",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
    category: "Glassware",
  },
  {
    id: "3",
    name: "Gold Wedding Invitation Suite",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop",
    category: "Stationery",
  },
  {
    id: "4",
    name: "Vintage Table Centerpiece",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop",
    category: "Decor",
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium text-sm uppercase tracking-wide">
                Wedding Collection
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Featured Wedding Supplies
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Curated selection of exquisite items to make your special day unforgettable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-4 md:mt-0"
          >
            <Link to="/wedding">
              <Button variant="heroOutline" className="gap-2">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t border-border"
        >
          {[
            { icon: Star, label: "500+ Happy Couples" },
            { icon: Heart, label: "Premium Quality" },
            { icon: Star, label: "5-Star Reviews" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-muted-foreground">
              <item.icon className="w-5 h-5 text-gold" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
