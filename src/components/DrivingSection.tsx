import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Car, Clock, Shield, Star, ArrowRight, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Licensed Drivers",
    description: "All our drivers are fully licensed and professionally trained",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Book anytime, day or night, for any occasion",
  },
  {
    icon: Star,
    title: "Luxury Fleet",
    description: "Premium vehicles for weddings, events, and more",
  },
  {
    icon: Users,
    title: "Group Transport",
    description: "Accommodate large parties with our spacious vehicles",
  },
];

const DrivingSection = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium text-sm uppercase tracking-wide">
                Professional Transport
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Premium Driving Services
            </h2>
            <p className="text-secondary-foreground/80 mb-8 leading-relaxed">
              Experience luxury transportation for weddings, corporate events, airport transfers, and special occasions. Our professional chauffeurs ensure a comfortable and memorable journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-secondary-foreground/70 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/driving">
                <Button variant="hero" size="lg" className="gap-2">
                  Book a Ride
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image/Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop"
                alt="Luxury car service"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1000+</div>
                    <div className="text-white/80 text-sm">Rides Completed</div>
                  </div>
                  <div className="text-center border-x border-white/20">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-white/80 text-sm">Pro Drivers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">4.9</div>
                    <div className="text-white/80 text-sm">Star Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-card text-card-foreground rounded-xl p-4 shadow-elegant"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">City-Wide Coverage</div>
                  <div className="text-muted-foreground text-sm">Available everywhere</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DrivingSection;
