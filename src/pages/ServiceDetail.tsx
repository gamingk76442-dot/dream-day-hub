import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Music, Utensils, Flower2, Palette, PartyPopper, Check, Star, Calendar, ArrowLeft, Clock, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const servicesData = [
  {
    id: "photography-video",
    icon: Camera,
    title: "Photography & Video",
    description: "Capture every precious moment with our professional photographers and videographers. We offer packages for weddings, corporate events, and special occasions.",
    fullDescription: "Our photography and videography team brings years of experience capturing life's most precious moments. From candid shots to perfectly staged portraits, we ensure every frame tells your story beautifully.",
    features: ["Professional equipment", "Edited photos & videos", "Same-day highlights", "Custom packages", "Drone footage", "Photo booth"],
    price: "From $500",
    priceValue: 500,
    rating: 4.8,
    reviewCount: 124,
    duration: "Full day coverage",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "dj-entertainment",
    icon: Music,
    title: "DJ & Entertainment",
    description: "Keep the party going with live music, DJs, and entertainment services. We provide sound systems and lighting for any venue size.",
    fullDescription: "Get the party started with our professional DJ services and entertainment options. We bring the energy, the equipment, and the expertise to make your event unforgettable.",
    features: ["Professional DJ setup", "Live bands available", "Custom playlists", "MC services", "Lighting effects", "Sound system"],
    price: "From $300",
    priceValue: 300,
    rating: 4.9,
    reviewCount: 89,
    duration: "4-8 hours",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "catering-services",
    icon: Utensils,
    title: "Catering Services",
    description: "Exquisite culinary experiences tailored to your event's unique needs. From buffets to plated dinners, we handle it all.",
    fullDescription: "Our award-winning catering team creates culinary masterpieces that delight the senses. From elegant plated dinners to interactive food stations, we cater to all tastes and dietary requirements.",
    features: ["Custom menus", "Dietary accommodations", "Professional staff", "Bar services", "Table settings", "Dessert stations"],
    price: "From $25/person",
    priceValue: 25,
    rating: 4.7,
    reviewCount: 156,
    duration: "Event duration",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "floral-design",
    icon: Flower2,
    title: "Floral Design",
    description: "Stunning floral arrangements that bring natural beauty to your celebration. Bouquets, centerpieces, and venue decor.",
    fullDescription: "Transform your venue with our exquisite floral designs. Our expert florists create stunning arrangements using the freshest flowers, perfectly tailored to your event's theme and color palette.",
    features: ["Custom designs", "Fresh flowers", "Setup included", "Preservation options", "Bridal bouquets", "Venue florals"],
    price: "From $200",
    priceValue: 200,
    rating: 4.9,
    reviewCount: 98,
    duration: "Design & setup",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523694576729-dc99d3159e5a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1561128290-006dc4827214?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "event-decoration",
    icon: Palette,
    title: "Event Decoration",
    description: "Transform any venue with our creative decoration and styling services. We bring your vision to life.",
    fullDescription: "Our creative team transforms ordinary spaces into extraordinary experiences. From elegant weddings to corporate galas, we handle every decorative detail with precision and artistry.",
    features: ["Theme development", "Furniture rental", "Lighting design", "Full setup & breakdown", "Backdrops", "Table styling"],
    price: "From $400",
    priceValue: 400,
    rating: 4.8,
    reviewCount: 112,
    duration: "Setup day",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "event-planning",
    icon: PartyPopper,
    title: "Event Planning",
    description: "Full-service event planning and coordination for stress-free celebrations. We handle every detail.",
    fullDescription: "Let us take the stress out of event planning. Our experienced coordinators manage every aspect of your event, from initial concept to flawless execution, ensuring your special day is perfect.",
    features: ["Vendor coordination", "Timeline management", "Day-of coordination", "Budget planning", "Guest management", "Emergency handling"],
    price: "From $800",
    priceValue: 800,
    rating: 5.0,
    reviewCount: 67,
    duration: "Full planning",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop",
    ],
  },
];

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    notes: "",
  });

  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("bookings").insert({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        service_type: service.title,
        booking_date: formData.date,
        booking_time: formData.time,
        notes: `Guests: ${formData.guests}\n${formData.notes}`,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Booking Submitted!",
        description: "We'll contact you shortly to confirm your booking.",
      });
      setIsBookingOpen(false);
      setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: "", notes: "" });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Back button */}
        <div className="container mx-auto px-4 mb-6">
          <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>

        {/* Hero Image */}
        <section className="container mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden h-64 md:h-96"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/90 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  {service.title}
                </h1>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(service.rating) ? "fill-gold text-gold" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-2 font-semibold text-foreground">{service.rating}</span>
                </div>
                <span className="text-muted-foreground">({service.reviewCount} reviews)</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed">{service.fullDescription}</p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">What's Included</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Gallery</h2>
                <div className="grid grid-cols-3 gap-4">
                  {service.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
                      <img src={img} alt={`${service.title} ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Booking Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <div className="text-center mb-6">
                  <span className="text-sm text-muted-foreground">Starting at</span>
                  <div className="text-3xl font-bold text-primary">{service.price}</div>
                </div>

                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button variant="hero" size="lg" className="w-full mb-4">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book This Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-xl">Book {service.title}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Event Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Preferred Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="guests">Expected Guests</Label>
                        <Input
                          id="guests"
                          type="number"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          placeholder="Approximate number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Tell us about your event..."
                          rows={3}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Link to="/contact">
                  <Button variant="outline" className="w-full">
                    Contact for Custom Quote
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Free consultation
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Flexible scheduling
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    100% satisfaction guarantee
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
