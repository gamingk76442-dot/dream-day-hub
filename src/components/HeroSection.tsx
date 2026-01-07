import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Car, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Heart,
    title: "Wedding Supplies",
    description: "Everything for your perfect day",
    path: "/wedding",
    color: "from-primary to-rose-gold-light",
  },
  {
    icon: Car,
    title: "Driving Services",
    description: "Professional chauffeur services",
    path: "/driving",
    color: "from-navy to-navy-light",
  },
  {
    icon: Sparkles,
    title: "Other Services",
    description: "Event planning & more",
    path: "/services",
    color: "from-gold to-gold-light",
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Your One-Stop Service Destination
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
          >
            Making Your Special Moments{" "}
            <span className="text-gradient-rose">Truly Memorable</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            From exquisite wedding supplies to professional driving services, we provide everything you need to create unforgettable experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline" size="xl">
                Explore Services
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Link to={service.path}>
                <div className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border border-border">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
