import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price?: string;
  image?: string;
  onClick?: () => void;
}

const ServiceCard = ({ icon: Icon, title, description, price, image, onClick }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border cursor-pointer"
      onClick={onClick}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          {price && (
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              {price}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
