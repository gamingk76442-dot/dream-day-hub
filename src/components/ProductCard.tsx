import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  onBook?: () => void;
}

const ProductCard = ({ name, price, image, category, onBook }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-1 line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          <Button variant="hero" size="sm" onClick={onBook} className="gap-2">
            <ShoppingBag className="w-4 h-4" />
            Book
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
