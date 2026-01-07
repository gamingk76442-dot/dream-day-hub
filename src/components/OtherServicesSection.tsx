import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, Music, Utensils, Flower2, ArrowRight, Palette, PartyPopper } from "lucide-react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: Camera,
    title: "Photography & Video",
    description: "Capture every precious moment with our professional photographers and videographers.",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=250&fit=crop",
  },
  {
    icon: Music,
    title: "DJ & Entertainment",
    description: "Keep the party going with live music, DJs, and entertainment services.",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=250&fit=crop",
  },
  {
    icon: Utensils,
    title: "Catering Services",
    description: "Exquisite culinary experiences tailored to your event's unique needs.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=250&fit=crop",
  },
  {
    icon: Flower2,
    title: "Floral Design",
    description: "Stunning floral arrangements that bring natural beauty to your celebration.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=250&fit=crop",
  },
  {
    icon: Palette,
    title: "Event Decoration",
    description: "Transform any venue with our creative decoration and styling services.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop",
  },
  {
    icon: PartyPopper,
    title: "Event Planning",
    description: "Full-service event planning and coordination for stress-free celebrations.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=250&fit=crop",
  },
];

const OtherServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
            Complete Event Solutions
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Additional Services
          </h2>
          <p className="text-muted-foreground">
            Everything you need to create the perfect event, all in one place.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/services">
            <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OtherServicesSection;
