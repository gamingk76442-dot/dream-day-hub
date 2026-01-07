import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Camera, Music, Utensils, Flower2, Palette, PartyPopper, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Camera,
    title: "Photography & Video",
    description: "Capture every precious moment with our professional photographers and videographers. We offer packages for weddings, corporate events, and special occasions.",
    features: ["Professional equipment", "Edited photos & videos", "Same-day highlights", "Custom packages"],
    price: "From $500",
  },
  {
    icon: Music,
    title: "DJ & Entertainment",
    description: "Keep the party going with live music, DJs, and entertainment services. We provide sound systems and lighting for any venue size.",
    features: ["Professional DJ setup", "Live bands available", "Custom playlists", "MC services"],
    price: "From $300",
  },
  {
    icon: Utensils,
    title: "Catering Services",
    description: "Exquisite culinary experiences tailored to your event's unique needs. From buffets to plated dinners, we handle it all.",
    features: ["Custom menus", "Dietary accommodations", "Professional staff", "Bar services"],
    price: "From $25/person",
  },
  {
    icon: Flower2,
    title: "Floral Design",
    description: "Stunning floral arrangements that bring natural beauty to your celebration. Bouquets, centerpieces, and venue decor.",
    features: ["Custom designs", "Fresh flowers", "Setup included", "Preservation options"],
    price: "From $200",
  },
  {
    icon: Palette,
    title: "Event Decoration",
    description: "Transform any venue with our creative decoration and styling services. We bring your vision to life.",
    features: ["Theme development", "Furniture rental", "Lighting design", "Full setup & breakdown"],
    price: "From $400",
  },
  {
    icon: PartyPopper,
    title: "Event Planning",
    description: "Full-service event planning and coordination for stress-free celebrations. We handle every detail.",
    features: ["Vendor coordination", "Timeline management", "Day-of coordination", "Budget planning"],
    price: "From $800",
  },
];

const Services = () => {
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
              <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
                Complete Event Solutions
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Services
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Everything you need to create the perfect event, all in one place.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="container mx-auto px-4 py-16">
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center md:items-end gap-4">
                    <div className="text-center md:text-right">
                      <span className="text-sm text-muted-foreground">Starting at</span>
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                    </div>
                    <Link to="/contact">
                      <Button variant="hero">Get a Quote</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
