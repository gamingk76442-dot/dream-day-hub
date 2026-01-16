import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Camera, Music, Utensils, Flower2, Palette, PartyPopper, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    id: "photography-video",
    icon: Camera,
    title: "Photography & Video",
    description: "Capture every precious moment with our professional photographers and videographers. We offer packages for weddings, corporate events, and special occasions.",
    features: ["Professional equipment", "Edited photos & videos", "Same-day highlights", "Custom packages"],
    price: "From $500",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "dj-entertainment",
    icon: Music,
    title: "DJ & Entertainment",
    description: "Keep the party going with live music, DJs, and entertainment services. We provide sound systems and lighting for any venue size.",
    features: ["Professional DJ setup", "Live bands available", "Custom playlists", "MC services"],
    price: "From $300",
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "catering-services",
    icon: Utensils,
    title: "Catering Services",
    description: "Exquisite culinary experiences tailored to your event's unique needs. From buffets to plated dinners, we handle it all.",
    features: ["Custom menus", "Dietary accommodations", "Professional staff", "Bar services"],
    price: "From $25/person",
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "floral-design",
    icon: Flower2,
    title: "Floral Design",
    description: "Stunning floral arrangements that bring natural beauty to your celebration. Bouquets, centerpieces, and venue decor.",
    features: ["Custom designs", "Fresh flowers", "Setup included", "Preservation options"],
    price: "From $200",
    rating: 4.9,
    reviewCount: 98,
  },
  {
    id: "event-decoration",
    icon: Palette,
    title: "Event Decoration",
    description: "Transform any venue with our creative decoration and styling services. We bring your vision to life.",
    features: ["Theme development", "Furniture rental", "Lighting design", "Full setup & breakdown"],
    price: "From $400",
    rating: 4.8,
    reviewCount: 112,
  },
  {
    id: "event-planning",
    icon: PartyPopper,
    title: "Event Planning",
    description: "Full-service event planning and coordination for stress-free celebrations. We handle every detail.",
    features: ["Vendor coordination", "Timeline management", "Day-of coordination", "Budget planning"],
    price: "From $800",
    rating: 5.0,
    reviewCount: 67,
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
                className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border hover:shadow-elegant transition-shadow cursor-pointer"
                onClick={() => window.location.href = `/services/${service.id}`}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 mb-4 ml-15">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(service.rating) ? "fill-gold text-gold" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground">{service.rating}</span>
                      <span className="text-sm text-muted-foreground">({service.reviewCount} reviews)</span>
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
                    <Link to={`/services/${service.id}`} onClick={(e) => e.stopPropagation()}>
                      <Button variant="hero">View Details & Book</Button>
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
