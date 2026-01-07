import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = ["All", "Flowers", "Decor", "Stationery", "Glassware", "Accessories"];

const products = [
  { id: "1", name: "Elegant Bridal Bouquet", price: 149.99, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop", category: "Flowers" },
  { id: "2", name: "Crystal Champagne Glasses Set", price: 89.99, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop", category: "Glassware" },
  { id: "3", name: "Gold Wedding Invitation Suite", price: 199.99, image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop", category: "Stationery" },
  { id: "4", name: "Vintage Table Centerpiece", price: 79.99, image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop", category: "Decor" },
  { id: "5", name: "Rose Gold Candle Holders", price: 45.99, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", category: "Decor" },
  { id: "6", name: "Bridal Veil - Cathedral Length", price: 299.99, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop", category: "Accessories" },
  { id: "7", name: "Wedding Guest Book", price: 59.99, image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=400&h=300&fit=crop", category: "Stationery" },
  { id: "8", name: "White Rose Arrangement", price: 129.99, image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop", category: "Flowers" },
];

const Wedding = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">Wedding Collection</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Wedding Supplies
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Discover our curated collection of exquisite wedding essentials to make your special day truly magical.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="container mx-auto px-4 py-12">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "hero" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wedding;
